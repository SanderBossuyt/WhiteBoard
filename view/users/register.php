<section id="Registratie_form">

    <header><h1>Register</h1></header>
    <div class="lijn"></div>

    <form action="index.php?page=register" method="post" class="form-horizontal" id="formregister" enctype="multipart/form-data">

        <div class="overflow">
            <div class="navleft">
                <div id="name_float" class="input text">
                    <label>
                        <input id="name" type="text" name="regname" value="<?php if(!empty($_POST['regname'])) echo $_POST['regname'];?>" placeholder="name" />
                        <p class="error<?php if(empty($errors['regname'])) echo ' hidden';?>" data-for="regname">Please enter your name</p>
                    </label>
                </div>
            
                <div id="last_float" class="input text">
                    <label>
                        <input id="last_name" type="text" name="reglastname" value="<?php if(!empty($_POST['reglastname'])) echo $_POST['reglastname'];?>" placeholder="last name" />
                        <p class="error<?php if(empty($errors['reglastname'])) echo ' hidden';?>" data-for="reglastname">Please enter your lastname</p>
                    </label>
                </div>

                <div class="input text">
                    <label>
                        
                        <input id="username" type="text" name="regusername" value="<?php if(!empty($_POST['regusername'])) echo $_POST['regusername'];?>" placeholder="Username"/>
                        <p class="error<?php if(empty($errors['regusername'])) echo ' hidden';?>" data-for="regusername">Please enter your username</p>
                    </label>
                </div>
            
                <div class="input text">
                    <label>
                        
                        <input id="email" type="text" name="regemail" value="<?php if(!empty($_POST['regemail'])) echo $_POST['regemail'];?>" placeholder="Email"/>
                        <p class="error<?php if(empty($errors['regemail'])) echo ' hidden';?>" data-for="regemail">Please enter your email address</p>
                    </label>
                </div>
            </div>
        
            <div class="navright">
                <div class="input text">
                    <label>
                        
                        <input id="password" type="password" name="regpassword" value="<?php if(!empty($_POST['regpassword'])) echo $_POST['regpassword'];?>" placeholder="Password"/>
                        <p class="error<?php if(empty($errors['regpassword'])) echo ' hidden';?>" data-for="regpassword">Please enter your password</p>
                    </label>
                </div>
        
            
                <div class="input text">
                    <label>
                        
                        <input id="confirm_password" type="password" name="confirm_password" value="<?php if(!empty($_POST['confirm_password'])) echo $_POST['confirm_password'];?>" placeholder="Corfirm password"/>
                        <p class="error<?php if(empty($errors['confirm_password'])) echo ' hidden';?>" data-for="confirm_password">password doesn't match</p>
                    </label>
                </div>
            </div>
        </div>
        
        <div class="form-group<?php if(!empty($errors['image'])) echo ' has-error'; ?>">
            <label for="addImageImage">Image:</label>     
                <input type="file" name="image" id="addImageImage" class="form-control" value="<?php if(!empty($_POST['image'])) echo $_POST['image'];?>" />
                </br>
                <span class="error hidden"><?php
                    if(empty($errors['image'])) echo 'Please select a square image';
                    else echo $errors['image'];
                ?>
                </span>      
        </div>
        
        <div class="form-group">
            <div><input id="registratie_button" type="submit" value="Let's go for it !" class="reg"></div>
        </div>
    
    </form>

    <div id="lijn_bottom"></div>
       
</section>