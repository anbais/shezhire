$(function () {
  var customText = ''; // Variable to store custom text

  $('.genealogy-tree ul').hide();
  $('.genealogy-tree > ul').show();
  $('.genealogy-tree ul.active').show();

  var previousAction = null; // Variable to store previous action

  $('.genealogy-tree li').on('click', function (e) {
    var clickedNode = $(this);
    var clickedBranch = clickedNode.find('> ul');
    var siblings = clickedNode.siblings('li');
    var customTextElement = $('#custom-text'); // Element to display custom text

    // Check if the clicked node is in the last layer
    if (!clickedNode.find('ul').length) {
      // Set custom text for the last layer nodes
      customText = "Finish";
      customTextElement.text(customText);
      return;
    }

    // Reset custom text if the clicked node has children
    customText = '';
    customTextElement.text('');

    // Function to hide inactive branches
    function hideInactiveBranches() {
      $('.genealogy-tree ul')
        .not(clickedBranch.parentsUntil('.genealogy-tree'))
        .not(clickedBranch)
        .not(siblings)
        .hide()
        .removeClass('active');
    }

    // Check if the clicked branch is already active
    if (clickedBranch.hasClass('active')) {
      // Hide the clicked branch's children
      clickedBranch.hide().removeClass('active');
      // Show the clicked node's siblings
      siblings.show();

      // Store the previous action
      previousAction = function () {
        clickedBranch.show().addClass('active');
        siblings.hide();
        hideInactiveBranches();
      };
    } else {
      // Hide all inactive branches except the ancestors, clicked branch, and its siblings
      hideInactiveBranches();
      // Hide the clicked node's siblings
      siblings.hide();
      // Show the clicked branch and add active class
      clickedBranch.show().addClass('active');

      // Store the previous action
      previousAction = function () {
        clickedBranch.hide().removeClass('active');
        siblings.show();
        hideInactiveBranches();
      };
    }

    // Check if the tree width exceeds the page width
    var treeWidth = $('.genealogy-tree').outerWidth();
    var pageWidth = $(window).width();

    if (treeWidth > pageWidth) {
      // Close all inactive branches
      hideInactiveBranches();
    }

    e.stopPropagation();
  });
});
