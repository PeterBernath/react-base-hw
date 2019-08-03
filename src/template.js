export default  (appContent, alap) => `
<!doctype html>
<html>
    <head>
        <script async="" type="text/javascript" src="http://localhost:7000/assets/bundle.js"></script>
        <title>Lensa Testing Api</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="http://localhost:7000/assets/bundle.css">
        <script>
            window.__initial_state = ${JSON.stringify(alap)};
        </script>
    </head>
    <body>
        <div class='page-wrapper'>
            <div class='page-container'>
              <div id="root">
                ${appContent}
              </div>
            </div>
        </div>
    </body>
</html>
`;