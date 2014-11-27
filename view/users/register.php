<section id="content">

    <header><h1>Register</h1></header>

    <form action="index.php?page=register" method="post" class="form-horizontal" id="formregister" enctype="multipart/form-data">

        <div class="overflow">
            <div class="navleft">
                <div class="input text">
                    <label>
                        <span>name:</span>
                        <input type="text" name="regname" value="<?php if(!empty($_POST['regname'])) echo $_POST['regname'];?>" />
                        <p class="error<?php if(empty($errors['regname'])) echo ' hidden';?>" data-for="regname">Please enter your name</p>
                    </label>
                </div>
            
                <div class="input text">
                    <label>
                        <span>last name:</span>
                        <input type="text" name="reglastname" value="<?php if(!empty($_POST['reglastname'])) echo $_POST['reglastname'];?>" />
                        <p class="error<?php if(empty($errors['reglastname'])) echo ' hidden';?>" data-for="reglastname">Please enter your lastname</p>
                    </label>
                </div>

                <div class="input text">
                    <label>
                        <span>username:</span>
                        <input type="text" name="regusername" value="<?php if(!empty($_POST['regusername'])) echo $_POST['regusername'];?>" />
                        <p class="error<?php if(empty($errors['regusername'])) echo ' hidden';?>" data-for="regusername">Please enter your username</p>
                    </label>
                </div>
            
                <div class="input text">
                    <label>
                        <span>email:</span>
                        <input type="text" name="regemail" value="<?php if(!empty($_POST['regemail'])) echo $_POST['regemail'];?>" />
                        <p class="error<?php if(empty($errors['regemail'])) echo ' hidden';?>" data-for="regemail">Please enter your email address</p>
                    </label>
                </div>
            </div>
        
            <div class="navright">
                <div class="input text">
                    <label>
                        <span>password:</span>
                        <input type="password" name="regpassword" value="<?php if(!empty($_POST['regpassword'])) echo $_POST['regpassword'];?>" />
                        <p class="error<?php if(empty($errors['regpassword'])) echo ' hidden';?>" data-for="regpassword">Please enter your password</p>
                    </label>
                </div>
        
            
                <div class="input text">
                    <label>
                        <span>confirm password:</span>
                        <input type="password" name="confirm_password" value="<?php if(!empty($_POST['confirm_password'])) echo $_POST['confirm_password'];?>" />
                        <p class="error<?php if(empty($errors['confirm_password'])) echo ' hidden';?>" data-for="confirm_password">password doesn't match</p>
                    </label>
                </div>
            </div>
        </div>
        
        <div class="form-group<?php if(!empty($errors['image'])) echo ' has-error'; ?>">
            <label for="addImageImage">Image:</label>     
                <input type="file" name="image" id="addImageImage" class="form-control" value="<?php if(!empty($_POST['image'])) echo $_POST['image'];?>" />
                <span class="error hidden"><?php
                    if(empty($errors['image'])) echo 'Please select a square image';
                    else echo $errors['image'];
                ?>
                </span>      
        </div>
        
        <div class="form-group">
            <div><input type="submit" value="Let's go for it !" class="reg"></div>
        </div>
    
    </form>
       
</section>