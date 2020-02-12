$(function () {
    //start the tree in an autocollapsed state
//    $('#tasks-tree ul').hide(400);

    $('#dropdownMenuButton').on('click', function (e) {
        console.log("Button pressed...");
    });

    $('#tasks-tree li').on('click', function (e) {
        if (!e.originalEvent.target.classList.contains("btn")) {
            e.stopPropagation(); // prevent links from toggling the nodes
            console.log("Class: " + $(this)[0].className);
            $(this).children('ul').slideToggle();
        }
    });

    $('#new-task-btn').on('click', function (e) {
        $('#message').attr('hidden', true);
        let priority = parseInt($('input[name="new-task-pri"]:checked').val());
        let description = $('#text-new-desc').val();
        let name = $('#text-new-name').val();
        let [isValid, message] = validateNewTask(description, name, priority);
        if (!isValid) {
            $('#message').removeAttr('hidden');
            $('#message').text(message);
        } else {
            $.post('add_task', {'name': name, 'desc': description, 'priority': priority})
            .done(function(data, status) { console.log('Success: data: ' + data + ', status: '+status)})
            .fail(function(xhr, status) { console.log('Failed: xhr: ' + xhr + ', status: ' + status)})
        }
    });

    // This code opens all hyperlinks in a new window
    // and avoids anchors
//    $('#tasks-tree a').not('[href="#"]').attr('target', '_blank');
});

function validateNewTask(description, name, priority) {
    if (description.trim().length < 1)
        return [false, "Description is missing."]
    if (name.trim().length < 1)
        return [false, "Name is missing"]
    if (priority < 0 || priority > 2)
        return [false, "Priority is invalid"]
    return [true, "All is good !"]
}