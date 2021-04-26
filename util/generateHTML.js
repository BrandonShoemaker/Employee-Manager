
// returns the data to write to the file, dynamically growing
function htmlGenerator(session){
    return `
    
<!doctype html>
<html class="no-js" lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Foundation for Sites</title>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@100&family=Nunito:wght@200&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/foundation.css">
    <link rel="stylesheet" href="assets/css/styles.css">
  </head>
<body>

  <header class="width-100">
    <h1 class="text-center banner">Employee Management Center</h1>
  </header>
  <main class="employee-container">
    <div class="grid-y">
      <div class="grid-y">

        <!-- ================================================================================== -->
        <!--                               beginning of managers                                -->
        <!-- ================================================================================== -->

        <div class="border-bottom employeeSectMargins">
          <h2 class="employeeTitlePadding mainColor">Team Managers</h2>
          <div class="grid-x">
            ${session.getManagers().map(manager => {
                return  `
                <div class="card subColor margins small-3 medium-3 employeeFontSize">
                    <div class="card-divider card-divider2">
                        Name: ${manager.getName()}
                    </div>
                    <div class="card-section card-section2 border-bottom">
                        Employee Id: ${manager.getId()}
                    </div>
                    <a href="mailto: ${manager.getEmail()}" class="card-section card-section2 border-bottom">
                        Send Email To: ${manager.getEmail()}
                    </a>
                    <div class="card-section card-section2">
                        ${manager.getOfficeNum()}
                    </div>
                </div>`;
            })}
          </div>
        </div>
        <!-- ================================================================================== -->
        <!--                               beginning of engineers                               -->
        <!-- ================================================================================== -->
        <div class="employeeSectMargins border-bottom">
          <h2 class="employeeTitlePadding mainColor">Engineers</h2>
          <div class="grid-x">
            ${session.getEngineers().map(engineer => {
              return `
                <div class="card subColor margins small-3 medium-3 employeeFontSize">
                    <div class="card-divider card-divider2">
                        Name: ${engineer.getName()}
                    </div>
                    <div class="card-section card-section2 border-bottom">
                        Employee Id: ${engineer.getId()}
                    </div>
                    <a href="mailto: ${engineer.getEmail()}" class="card-section card-section2 border-bottom">
                        Send Email To: ${engineer.getEmail()}
                    </a>
                    <a href="https://www.github.com/${engineer.getGithub()}" class="card-section card-section2">
                        Github Link: https://www.github/${engineer.getGithub()}
                    </a>
                </div>
              `;
            })}
          </div>
        </div>
        <!-- ================================================================================== -->
        <!--                               beginning of interns                                 -->
        <!-- ================================================================================== -->
        <div class="employeeSectMargins">
          <h2 class="employeeTitlePadding mainColor">Interns</h2>
          <div class="grid-x">
            ${session.getInterns().map(intern => {
                return `
                <div class="card subColor margins small-3 medium-3 employeeFontSize">
                    <div class="card-divider card-divider2">
                        Name: ${intern.getName()}
                    </div>
                    <div class="card-section card-section2 border-bottom">
                        Employee Id: ${intern.getId()}
                    </div>
                    <a href="mailto:${}" class="card-section card-section2 border-bottom">
                        Send Email To: ${intern.getEmail()}
                    </a>
                    <div class="card-section card-section2">
                        School: ${intern.getSchool()}
                    </div>
                </div>
                `;
            })}
          </div>
        </div>
      </div>
    </div>
  </main>


<script src="assets/js/vendor.js"></script>
<script src="assets/js/foundation.js"></script>
</body>
</html>


    
    `;
}

module.exports = htmlGenerator;