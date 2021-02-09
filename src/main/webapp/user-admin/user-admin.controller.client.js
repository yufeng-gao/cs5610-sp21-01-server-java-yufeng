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
        $updateBtn.attr("id", userId)
        var selectedUser = users.find(user => user._id === userId)
        $usernameFld.val(selectedUser.username)
        $passwordFld.val(selectedUser.password)
        $firstNameFld.val(selectedUser.firstName)
        $lastNameFld.val(selectedUser.lastName)
        $roleFld.val(selectedUser.role)
    }

    function updateUser() {
        var userId = $updateBtn.attr("id")
        var selectedUser = users.find(user => user._id === userId)
        selectedUser.username = usernameFld.val()
        selectedUser.password = passwordFld.val()
        selectedUser.firstName = firstNameFld.val()
        selectedUser.lastName = lastNameFld.val()
        selectedUser.role = roleFld.val()
        userService.updateUser(userId, selectedUser)
            .then(function (status) {
                var userIndex = users.findIndex(user => user._id === userId)
                users[userIndex] = selectedUser
                renderUsers(users)
            })
    }

    function renderUsers(users) {
        $tbody.empty()
        $userRowTemplate.removeClass("wbdv-hidden")
        for (var i = 0; i < users.length; i++) {
            var user = users[i]
            var userId = user._id
            $userRowTemplate.find(".wbdv-username").val(user.username)
            $userRowTemplate.find(".wbdv-first-name").val(user.firstName)
            $userRowTemplate.find(".wbdv-last-name").val(user.lastName)
            $userRowTemplate.find(".wbdv-role").val(user.role)
            $userRowTemplate.find(".wbdv-actions").attr("id", userId)
            $tbody.prepend($userRowTemplate)
        }
        $userRowTemplate.addClass("wbdv-hidden")
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