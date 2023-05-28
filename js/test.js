$(function () {
  $('.genealogy-tree ul').hide();
  $('.genealogy-tree > ul').show();
  $('.genealogy-tree ul.active').show();

  $('.genealogy-tree li').on('click', function (e) {
    var clickedNode = $(this);
    var clickedBranch = clickedNode.find('> ul');

    // Check if the clicked branch is already active
    if (clickedBranch.hasClass('active')) {
      return; // Do nothing if already active
    }

    // Hide all inactive branches except the ancestors of the clicked branch
    $('.genealogy-tree ul').not(clickedBranch.parentsUntil('.genealogy-tree')).not(clickedBranch).hide().removeClass('active');

    // Show the clicked branch and add active class
    clickedBranch.show().addClass('active');

    // Check if the tree width exceeds the page width
//    var treeWidth = $('.genealogy-tree').outerWidth();
//    var pageWidth = $(window).width();

//    if (treeWidth > pageWidth) {
      // Close all inactive branches
//      $('.genealogy-tree ul').not('.active').hide().removeClass('active');
//    }

    e.stopPropagation();
  });
});
