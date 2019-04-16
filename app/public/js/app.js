var config = {
    ".chosen-select": {},
    ".chosen-select-deselect": {
        allow_single_deselect: true
    },
    ".chosen-select-no-single": {
        disable_search_threshold: 10
    },
    ".chosen-select-no-results": {
        no_results_text: "Oops, nothing found!"
    },
    ".chosen-select-width": {
        width: "50%"
    }
};

for (var selector in config) {
    $(selector).chosen(config[selector]);
}

$("#submit").on("click", function (event) {
    event.preventDefault();
    $('#container').trigger("reset");


    function validateForm() {
        var isValid = true;
        $(".form-control").each(function () {
            if ($(this).val() === "") {
                isValid = false;
            }
        });

        $(".chosen-select").each(function () {

            if ($(this).val() === "") {
                isValid = false;
            }
        });
        return isValid;
    }

    if (validateForm()) {
        var userData = {
            name: $("#name").val(),
            photo: $("#photo").val(),
            scores: [
                $("#question1").val(),
                $("#question2").val(),
                $("#question3").val(),
                $("#question4").val(),
                $("#question5").val(),
                $("#question6").val(),
                $("#question7").val(),
                $("#question8").val(),
                $("#question9").val(),
                $("#question10").val()
            ]
        };

        $.post("/api/friends", userData, function (data) {

            $("#match-name").text(data.name);
            $("#match-img").attr("src", data.photo);

            $("#results-modal").modal("toggle");

        });
    } else {
        alert("Please fill out all fields before submitting!");
    }
});