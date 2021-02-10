(function () {
    var $usernameFld, $passwordFld
    var $firstNameFld, $lastNameFld, $roleFld
    var $createBtn, $updateBtn
    var $userRowTemplate, $tbody
    var users = [];
    var userService = new AdminUserServiceClient()

    function createUser() {
        userService.createUser({
            username: $usernameFld.val(),
            password: $passwordFld.val(),
            firstName: $firstNameFld.val(),
            lastName: $lastNameFld.val(),
            role: $roleFld.val()
            })
            .then(function (actualUser) {
                users.push(actualUser)
                renderUsers(users)
            })
    }

    function deleteUser(event) {
        var $removeBtn = $(event.target)
        var userId = $removeBtn.parents(".wbdv-actions").attr("id")
        var userIndex = users.findIndex(user => user._id === userId)

        userService.deleteUser(userId)
            .then(function (status) {
                users.splice(userId, 1)
                renderUsers(users)
            })
    }

    function selectUser(event) {
        var $editBtn = jQuery(event.target)
        var userId = $editBtn.parents(".wbdv-actions").attr("id")
        var selectedUser = users.find(user => user._id === userId)
        $usernameFld.val(selectedUser.username)
        $passwordFld.val(selectedUser.password)
        $firstNameFld.val(selectedUser.firstName)
        $lastNameFld.val(selectedUser.lastName)
        $roleFld.val(selectedUser.role)
        $updateBtn.attr("id", userId)
    }

    function updateUser(event) {
        var userId = $updateBtn.attr("id")
        var selectedUser = users.find(user => user._id === userId)
        selectedUser.username = $usernameFld.val()
        selectedUser.password = $passwordFld.val()
        selectedUser.firstName = $firstNameFld.val()
        selectedUser.lastName = $lastNameFld.val()
        selectedUser.role = $roleFld.val()
        userService.updateUser(userId, selectedUser)
            .then(function (status) {
                var userIndex = users.findIndex(user => user._id === userId)
                users[userIndex] = selectedUser
                renderUsers(users)
            })
        $updateBtn.removeAttr("id")
        $usernameFld.val("")
        $passwordFld.val("")
        $firstNameFld.val("")
        $lastNameFld.val("")
    }

    function renderUsers(users) {
        $tbody.empty()
        for (var i = 0; i < users.length; i++) {
            var user = users[i]
            var userId = user._id
            $userRowTemplate.find(".wbdv-username").text(user.username)
            //following the html template, I didn't render the password value.
            //It can be done here with similar one-line fashion.
            //By introducing password class in the original template(html).
            $userRowTemplate.find(".wbdv-first-name").text(user.firstName)
            $userRowTemplate.find(".wbdv-last-name").text(user.lastName)
            $userRowTemplate.find(".wbdv-role").text(user.role)
            $userRowTemplate.find(".wbdv-actions").attr("id", userId)
            $('<div>').append($('#xxx').clone()).html()
            $tbody.prepend(
                `<tr class="wbdv-user">${$userRowTemplate.html()}</tr>
              `)
        }
        $(".wbdv-remove").click(deleteUser)
        $(".wbdv-edit").click(selectUser)
    }

    function main() {
        $usernameFld = $("#usernameFld")
        $passwordFld = $("#passwordFld")
        $firstNameFld = $("#firstNameFld")
        $lastNameFld = $("#lastNameFld")
        $roleFld = $("#roleFld")
        $createBtn = $(".wbdv-create")
        $tbody = $(".wbdv-tbody")
        $userRowTemplate = $(".wbdv-template")
        $updateBtn = $(".wbdv-update")

        $createBtn.click(() => {
            createUser()
            $usernameFld.val("")
            $passwordFld.val("")
            $firstNameFld.val("")
            $lastNameFld.val("")
        })
        $updateBtn.click(updateUser)

        userService.findAllUsers()
            .then(function (actualUsers) {
                users = actualUsers
                renderUsers(actualUsers)
            })
    }
    $(main);
})();