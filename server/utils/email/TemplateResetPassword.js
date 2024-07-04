const dotenv = require("dotenv");
dotenv.config();
const TemplateEmail = ({ userName, emailReceiver, token }) => {
  return `<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
        <title>Document</title>
    </head>

    <body>
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h1>Forgot your password</h1>
                    <p>Hello ${userName}</p>
                    <p>We’ve received a request to reset the password for the Blog account associated with
                        ${emailReceiver}. No changes have
                        been made to your account yet.</p>
                    <p>You can reset your password by clicking the link below:</p>
                    <a href='${process.env.CLIENT_URL}/reset-password/${token}' class="btn btn-primary text-uppercase">Reset Your Password</a>
                </div>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
                integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
                crossorigin="anonymous"></script>
    </body>

</html>`;
};

module.exports = { TemplateEmail };
