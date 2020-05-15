$(document).ready(() => {
    const todo_list_el = $("#todo_list");
    const todo_list_form_text = $("#todo_list_add_text");

    function has_todo_list_item(name) {
        name = name.toLowerCase();
        return Array.from(todo_list_el.children()).find(el => $(el).text().toLowerCase() === name);
    }

    function load() {
        try {
            if (!window.localStorage)
                return;

            if (!localStorage.getItem("todo_list"))
                save();

            Array.from(todo_list_el.children()).forEach(el => $(el).remove());
            JSON.parse(localStorage.getItem("todo_list")).forEach(item => {
                let entry = $("<li></li>");
                entry.text(item.name);
                if (item.done)
                    entry.addClass("done");
                todo_list_el.append(entry);
            });
        } catch(e) {}
    }

    load();

    function save() {
        try {
            if (!window.localStorage)
                return;

            localStorage.setItem("todo_list", JSON.stringify(Array.from(todo_list_el.children())
                .map(el => $(el))
                .map(el => ({ name: el.text(), done: el.hasClass("done") }))));
        } catch (e) {}
    }

    todo_list_el.on("click", "li", function() {
        $(this).toggleClass("done");
        save();
    });
    $("#todo_list_add_submit").click(function() {
        let name = todo_list_form_text.val();
        if (has_todo_list_item(name))
            return;
        let item = $("<li></li>").text(name);
        todo_list_el.append(item);

        save();
    });
});
