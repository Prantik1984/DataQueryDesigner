function JsonFileChange(th) {
    $("#upload-file-info").html($(th).val());
    import("https://localhost:7035/js/jsonView/view.js")
        .then(function (jsonView) {
            let file = th.files[0];
            let reader = new FileReader();
            reader.readAsText(file);
            reader.onload = function () {
                var tree = jsonView.create(reader.result);
                jsonView.render(tree, document.querySelector('.jsontree'));

            };

            reader.onerror = function () {
            };
        }, function (err) {
            alert(err);
        });
}