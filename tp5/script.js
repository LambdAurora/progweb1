function convert_inch_to_cm(inches) {
    return inches * 2.54;
}

function convert_cm_to_inch(cm) {
    return cm / 2.54;
}

function convert_pounds_to_g(pounds) {
    return pounds * 453.6;
}

function convert_g_to_pounds(g) {
    return g / 453.6;
}

const conversion_table = [];
conversion_table["inch"] = convert_cm_to_inch;
conversion_table["cm"] = convert_inch_to_cm;
conversion_table["g"] = convert_pounds_to_g;
conversion_table["pounds"] = convert_g_to_pounds;

$(document).ready(() => {
    // Partie 1
    $("p:not(.disparaitre)").click(function() {
        alert($(this).text());
    });
    $(".jquery_test").click(function() {
        alert($(this).text());
    });
    $("#jquery_test").click(function() {
        alert($(this).text());
    });

    // Partie 2
    $(".callback > .disparaitre").click(function() {
        $(this).fadeOut(() => {
            $(this).text("Texte changé");
            $(this).fadeIn();
        });
    });

    const conversion_display_el = $("#conversion_display")
    // Form
    $("#conversion_submit").click(_ => {
        let input = $("#conversion_input").val();

        // On vérifie qu'il y a un nombre de spécifié.
        if (input === "") {
            conversion_display_el.text("Error: please enter a value to convert.");
            conversion_display_el.addClass("error_color");
            return;
        } else {
            conversion_display_el.removeClass("error_color");
        }

        input = parseFloat(input);
        let target = $("#conversion_target").val();
        if (conversion_table[target]) {
            conversion_display_el.text(conversion_table[target](input).toString());
        } else {
            conversion_display_el.text("Error: target value is invalid or conversion table is incomplete.");
            conversion_display_el.addClass("error_color");
        }
    });
});
