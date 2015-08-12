<?php

Class LoginController extends BaseController {

    public function __construct() {
        parent::__construct();
    }

    public function login() {
        return View::make('login')->with('args',$this->args);
    }

    public function post_login() {
        $credentials = array( 'email' => Input::get('username'), 'password' => Input::get('password'));
        $remember = (Input::has('remember')) ? true : false;

        $rules = array('email' => array('required','min:2'),
               'password' => array('required','min:6'));

        $messages = array('email.required' => 'È necessario specificare il proprio username e la propria password per accedere',
                               'email.min' => 'Lo username deve essere lungo almeno 2 caratteri',
                       'password.required' => 'È necessario specificare il proprio username e la propria password per accedere',
                            'password.min' => 'La password deve essere lunga almeno 6 caratteri');

        $validator = Validator::make($credentials, $rules, $messages);

        if ($validator->passes()) {

            try {
                $user = Sentry::findUserByCredentials($credentials);

                $groups = Group::all();

                if ($user) {
                    foreach ($groups as $group) {
                        if ($user->inGroup($group->name)) {
                            $userAuth = Sentry::authenticate($credentials, $remember);

                            if ($userAuth) {
                                return $this->make_response($credentials, 
                                                            false, 
                                                            array($user->first_name.' '.$user->first_last.', Accesso '.$group->name.' consentito'), 
                                                            URL::to('admin/dashboard'));
                            }
                        }
                    }
                }
            }
            catch (Cartalyst\Sentry\Users\PasswordRequiredException $e) {
                return $this->make_response($credentials, true, array('Non hai inserito la password'));
            }
            catch (Cartalyst\Sentry\Users\UserNotFoundException $e) {
                return $this->make_response($credentials, true, array('Utente non trovato'));
            }
            catch (Cartalyst\Sentry\Users\WrongPasswordException $e) {
                return $this->make_response($credentials, true, array('Password o nome utente non corretti'));
            }
            catch(\Exception $e) {
                return $this->make_response($credentials, true, array("errore non previsto: ".$e->getMessage()));
            }
        }
        else {
            $errors = $validator->messages;
            return $this->make_response($credentials, true, $errors);
        }
    }

    public function post_remember_password() {
        $email = Input::get('email');

        try {
            $user = Sentry::findUserByLogin($email);
            $resetCode = $user->getResetPasswordCode();

            $input = array('id' => $user->id, 'reset_code' => $resetCode, 'root' => $this->root);

            $callback = function($message) use ($user) {
                $message->to($user->email, $user->first_name.' '.$user->last_name)->subject('Reset password');
            };

            Mail::send(array('html' => 'emails.reset_password'), $input, $callback);

            return $this->make_response($email, false, array('Richiesta di modifica password inviata correttamente'), URL::to('/'));
        }
        catch (Cartalyst\Sentry\Users\UserNotFoundException $e) {
            return $this->make_response($email, true, array('Utente non trovato'));
        }
        catch(\Exception $e){
            return $this->make_response($email, true, array("Errore non previsto: ".$e->getMessage()));
        }
    }

    public function reset_password($reset, $id, $da_mail = 1) {
        
        $reset = (Input::has('reset')) ? Input::get('reset') : $reset;
        $id = (Input::has('id')) ? Input::get('id') : $id;
        $da_mail = (Input::has('da_mail')) ? Input::get('da_mail') : $da_mail;
        $new_password = (Input::has('new_password')) ? Input::get('new_password') : null;

        $data = array('reset'=>$reset,
                                  'id'=>$id,
                                  'da_mail'=>$da_mail,
                                  'new_password'=>$new_password);

        $rules = array('reset' => 'required',
                                   'new_password' => 'required');
        $messages = array('newPassword.required' => 'Specifica una nuova password');

        $validator = Validator::make($data,$rules,$messages);

        $user = Sentry::findUserById($id);

        if ($validator->passes()) {
            try {
                $user = Sentry::findUserById($id);

                if ($user->checkResetPasswordCode($reset)) {
                    if ($user->attemptResetPassword($reset, $new_password)) {
                        return $this->make_response($data, false, array('Password resettata con successo'), URL::to('/'));
                    }
                    else {
                        return $this->make_response($data, true, array('Non è stato possibile resettare la password'));
                    }   
                }
                else {
                    return $this->make_response($data, true, array('Reset code non valido'));
                }
            }
            catch (Cartalyst\Sentry\Users\UserNotFoundException $e) {
                return $this->make_response($data, true, array('Utente non trovato'));
            }
        }

        if (!$da_mail) {
            $errors = $validator->messages;
            return $this->make_response($data, true, $errors);
        }

        return View::make('login_reset_password')
            ->with('reset', $reset)
            ->with('id', $id)
            ->with('da_mail', $da_mail)
        ->with('args',$this->args);
    }

    public function register_user() {
        return View::make('registrazione_utente');
    }

    public function post_register_user() {
        $input = Input::all();

        $rules = array('first_name' => array('required'),
                        'last_name' => array('required'),
                       'birth_date' => array('required'),
                           'gender' => array('required'),
                            'email' => array('required','email','unique:users,email'),
                         'password' => array('required','min:6'),
                   'password_again' => array('required','min:6','same:password'));

        $messages = array('first_name.required' => 'Nome richiesto',
                           'last_name.required' => 'Cognome richiesto',
                          'birth_date.required' => 'Cognome richiesto',
                              'gender.required' => 'specificare sesso',
                               'email.required' => 'indirizzo e-mail richiesto',
                                  'email.email' => 'inserisci un indirizzo e-mail valido',
                                 'email.unique' => 'indirizzo e-mail già presente',
                            'password.required' => 'password necessaria',
                      'password_again.required' => 'È necessario ripetere la password',
                          'password_again.same' => 'Passoword non coincidenti'); 

        $validator = Validator::make($input, $rules, $messages);

        if ($validator->passes()) {
            try {
                $user = Sentry::register($input['user']);

                $users_data = new Users_data;
                $users_data->create($input['user_data']);

                $userGroup = Sentry::findGroupByName(Config::get('constants.USER'));
                $user->addGroup($userGroup);

                $activationCode = $user->getActivationCode();
                $input['user']['activation_code'] = $activationCode;
                $input['user']['id'] = $user->id;
                $input['user']['root'] = $this->root;

                Mail::send('emails.register',$input, function($message) use ($input) {
                    $message->to($input['user']['email'], $input['user']['first_name'].' '.$input['user']['last_name'])->subject('Registrazione');
                });

                Status_user::create(array('users_id' => $user->id,
                                   'status_names_id' => Status_name::where('name', Config::get('constants.STATUS_USER_INATTESAATTIVAZIONE'))->first()->id,
                                        'first_name' => $user->first_name,
                                         'last_name' => $user->last_name));

                return $this->make_response($input, false, array('Utente registrato correttamente, in attesa di attivazione'));
            }
            catch(\Exception $e) {
                return $this->make_response($input, true, array("errore non previsto: ".$e->getMessage()."<br> File ".$e->getFile()."<br> Line ".$e->getLine()));
            }
        }

        $errors = $validator->messages();
        return $this->make_response($input, true, $errors);
    }

    public function post_register_mod_user() {
        $input = Input::all();

        $rules = array('first_name' => array('required'),
                        'last_name' => array('required'),
                       'birth_date' => array('required'),
                           'gender' => array('required'),
                            'email' => array('required','email','unique:users,email'),
                         'password' => array('required','min:6'),
                   'password_again' => array('required','min:6','same:password'));

        $messages = array('first_name.required' => 'Nome richiesto',
                           'last_name.required' => 'Cognome richiesto',
                          'birth_date.required' => 'Cognome richiesto',
                              'gender.required' => 'specificare sesso',
                               'email.required' => 'indirizzo e-mail richiesto',
                                  'email.email' => 'inserisci un indirizzo e-mail valido',
                                 'email.unique' => 'indirizzo e-mail già presente',
                            'password.required' => 'password necessaria',
                      'password_again.required' => 'È necessario ripetere la password',
                          'password_again.same' => 'Passoword non coincidenti'); 

        $validator = Validator::make($input, $rules, $messages);

        if ($validator->passes()) {
            try {

                $user = Sentry::findUserByID($input['user']['user_id']);
                $user->first_name = $input['user']['first_name'];
                $user->last_name = $input['user']['last_name'];
                $user->email = $input['user']['email'];
                $user->save();

                $users_data = Users_data::where('user_id',$input['user']['user_id'])->update($input['user_data']);

                return $this->make_response($input, false, array('Utente modificato correttamente'));
            }
            catch(\Exception $e) {
                return $this->make_response($input, true, array("errore non previsto: ".$e->getMessage()."<br> File ".$e->getFile()."<br> Line ".$e->getLine()));
            }
        }

        $errors = $validator->messages();
        return $this->make_response($input, true, $errors);
    }

    public function attivazione_utente($activation_code, $id) {
        try {
            $user = Sentry::findUserById($id);

            if (!$user->attemptActivation($activation_code)) {
                return $this->make_response($input, true, array("Attivazione non valida: attivazione fallita"), '/');
            }

            $input['email'] = $user->email;
            $input['first_name'] = $user->first_name;
            $input['last_name'] = $user->last_name;
            $input['root'] = $this->root;

            Mail::send('emails.activation',$input, function($message) use ($input) {
                $message->to($input['email'], $input['first_name'].' '.$input['last_name'])->subject('Utente attivato');
            });

            return $this->make_response($input, false, array("Attivazione avvenuta con successo"), '/');
        }
        catch (Cartalyst\Sentry\Users\UserNotFoundException $e) {
            return $this->make_response(null, true, array('Attivazione non valida: Utente non trovato'), '/');
        }
        catch (Cartalyst\Sentry\Users\UserAlreadyActivatedException $e) {
            return $this->make_response(null, true, array('Attivazione non valida: Utente già attivato'), '/');
        }
        catch(\Exception $e) {
            return $this->make_response(null, true, array("Attivazione non valida: ".$e->getMessage()), '/');
        }
    }
}