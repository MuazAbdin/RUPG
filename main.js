const controller = new Controller();

function toggleFriendsList() {
  if ($(this).hasClass("fa-angles-right")) {
    $(".friends-list").hide();
    $(this).parent().addClass("hidden-friends");
    $(this).removeClass("fa-angles-right");
    $(this).addClass("fa-angles-left");
    $(".user").css("grid-template-columns", "5fr 2fr 4rem");
  } else {
    $(".friends-list").show();
    $(this).parent().removeClass("hidden-friends");
    $(this).addClass("fa-angles-right");
    $(this).removeClass("fa-angles-left");
    $(".user").css("grid-template-columns", "5fr 2fr 3fr");
  }
}
$(".user").on("click", ".user-friends i", toggleFriendsList);

function toggleSavedUsersList() {
  if ($(this).find("i").hasClass("fa-angles-down")) {
    $(this).addClass("nav-item-active");
    $(this).find("i").removeClass("fa-angles-down");
    $(this).find("i").addClass("fa-angles-up");
    $(".saved-users").show();
  } else {
    $(this).removeClass("nav-item-active");
    $(this).find("i").removeClass("fa-angles-up");
    $(this).find("i").addClass("fa-angles-down");
    $(".saved-users").hide();
  }
}
$(".nav-list-item__users").click(toggleSavedUsersList);

$(".logo").click(() => controller.generateUser());
$(".nav-list-item__save").click(() => controller.saveUser());
$(".nav-list-item__users").click(() => controller.showSavedUsers());
$(".nav-list-item__users").on(
  "click",
  ".users-list-item:not(.empty-users)",
  function () {
    controller.loadUser($(this).data().id);
  }
);
$(".nav-list-item__users").on("click", ".fa-trash-can", function (event) {
  event.stopPropagation();
  controller.deleteUser($(this).parent().data().id);
});
