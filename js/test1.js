$(function () {
  $('.genealogy-tree ul').hide();
  $('.genealogy-tree > ul').show();
  $('.genealogy-tree ul.active').show();

  $('.genealogy-tree li').on('click', function (e) {
    var clickedNode = $(this);
    var clickedBranch = clickedNode.find('> ul');
    var siblings = clickedNode.siblings('li');

    // Check if the clicked branch is already active
    if (clickedBranch.hasClass('active')) {
      // Hide the clicked branch's children
      clickedBranch.hide().removeClass('active');
      // Show the clicked node's siblings
      siblings.show();
    } else {
      // Hide all inactive branches except the ancestors, clicked branch, and its siblings
      $('.genealogy-tree ul').not(clickedBranch.parentsUntil('.genealogy-tree')).not(clickedBranch).not(siblings).hide().removeClass('active');
      // Hide the clicked node's siblings
      siblings.hide();
      // Show the clicked branch and add active class
      clickedBranch.show().addClass('active');
    }

    // Check if the tree width exceeds the page width
    var treeWidth = $('.genealogy-tree').outerWidth();
    var pageWidth = $(window).width();

    if (treeWidth > pageWidth) {
      // Close all inactive branches
      $('.genealogy-tree ul').not('.active').hide().removeClass('active');
    }

    e.stopPropagation();
  });
});
