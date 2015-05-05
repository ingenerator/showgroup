/**
 * jQuery plugin to toggle visibility of multiple elements in a "group", potentially in different containers - for
 * example to show/hide fields for different variations of a form.
 *
 * @author    Andrew Coulton <andrew@ingenerator.com>
 * @copyright 2015 inGenerator Ltd
 * @licence   BSD
 */

;(function define_show_group($) {
  "use strict";

  /**
   * Initialise a showgroup container
   *
   * @param {object} container   DOM element that acts as the container
   * @param {object} options options to override default behaviour
   * @constructor
   */
  var ShowGroup = function (container, options) {
    this.$container = $(container);
    this.options = $.extend({}, ShowGroup.DEFAULTS, options);
  };

  ShowGroup.DEFAULTS = {
    // The default group to show if none is selected
    showgroupDefault: null
  };

  ShowGroup.prototype.activate = function showgroup_activate(group) {
    // Activate the default group if none is provided
    if (typeof group === 'undefined') {
      group = this.options.showgroupDefault;
    }

    var elements = this.$container.find('[data-showgroups]');

    elements.each(function() {
      var $this = $(this),
          elem_groups = $(this).attr('data-showgroups').split(',');

      if ($.inArray(group, elem_groups) >= 0) {
        $this.show();
      } else {
        $this.hide();
      }
    });
  };

  /**
   * jQuery plugin function. Call with:
   *  - empty or a hash of options to initialise on a container
   *  - a string group name to init (if required) and set the active group
   *
   * @param option see above
   * @returns {*} the jQuery object
   */
  $.fn.showgroup = function showgroup(option) {
    return this.each(function () {
      var $this   = $(this);
      var data    = $this.data('ingen.ShowGroup');
      var options = $.extend({}, ShowGroup.DEFAULTS, $this.data(), typeof option === 'object' && option);

      if (!data) {$this.data('ingen.ShowGroup', (data = new ShowGroup(this, options)));}
      if (typeof option === 'string') {
        data.activate(option);
      } else if (typeof option === 'undefined') {
        data.activate();
      }
    });
  };

  $(document).on('change.ingen.showgroup.data-api', '[data-showgroup-toggle]', function () {
    var $this = $(this),
        $container = $this.closest('[data-showgroup-container]');

    $container.showgroup($this.val());
  });

})(window.jQuery);
