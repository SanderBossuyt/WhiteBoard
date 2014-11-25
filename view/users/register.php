<div class="reg">

<section id="content">
    <form action="index.php?page=register" method="post" class="form-horizontal" id="formregister" enctype="multipart/form-data">

        <div class="overflow">
            <div class="regleft">
                <div class="input-text">
                    <label>
                        <span>name:</span>
                        <br />
                        <br />
                        <input type="text" name="regname" value="<?php if(!empty($_POST['regname'])) echo $_POST['regname'];?>" />
                        <p class="error<?php if(empty($errors['regname'])) echo ' hidden';?>" data-for="regname">Vul a.u.b. uw voornaam in</p>
                    </label>
                </div>
            
                <div class="input-text">
                    <label>
                        <span>last name:</span>
                        <br />
                        <br />
                        <input type="text" name="reglastname" value="<?php if(!empty($_POST['reglastname'])) echo $_POST['reglastname'];?>" />
                        <p class="error<?php if(empty($errors['reglastname'])) echo ' hidden';?>" data-for="reglastname">Vul a.u.b. uw naam in</p>
                    </label>
                </div>
            
                <div class="input-text">
                    <label>
                        <span>email:</span>
                        <br />
                        <br />
                        <input type="text" name="regemail" value="<?php if(!empty($_POST['regemail'])) echo $_POST['regemail'];?>" />
                        <p class="error<?php if(empty($errors['regemail'])) echo ' hidden';?>" data-for="regemail">Vul a.u.b. uw mailadres in</p>
                    </label>
                </div>
            </div>
        
            <div class="regleft">
                <div class="input-text">
                    <label>
                        <span>password:</span>
                        <br />
                        <br />
                        <input type="password" name="regpassword" value="<?php if(!empty($_POST['regpassword'])) echo $_POST['regpassword'];?>" />
                        <p class="error<?php if(empty($errors['regpassword'])) echo ' hidden';?>" data-for="regpassword">Vul a.u.b. uw wachtwoord in</p>
                    </label>
                </div>
        
            
                <div class="input-text">
                    <label>
                        <span>confirm password:</span>
                        <br />
                        <br />
                        <input type="password" name="confirm_password" value="<?php if(!empty($_POST['confirm_password'])) echo $_POST['confirm_password'];?>" />
                        <p class="error<?php if(empty($errors['confirm_password'])) echo ' hidden';?>" data-for="confirm_password">Vul het correcte wachtwoord in</p>
                    </label>
                </div>
            </div>
        </div>
        
        <div class="form-group">
            <div><input type="submit" value="join the club" class="reg"></div>
        </div>
    
    </form>

</section>
</div>

<script type="text/javascript" src="scripts/contact.js"></script>

