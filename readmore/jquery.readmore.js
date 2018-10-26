/**
 * jquery.readmore
 * 
 * Based on jquery.readmore plugin by Jake Trent & Mike Wendt
 * 
 * Substring long paragraphs and make expandable with "Read More" link.
 * Paragraph will be split either at exactly 'substr_len' chars or at the next
 * space char after 'substr_len' words (default).
 * 
 * @date 26 Out 2018
 * @author Jake Trent (original author) http://www.builtbyjake.com
 * @author Mike Wendt http://www.mikewendt.net
 * @author Pedro da Luz https://github.com/senhordaluz
 * @version 1.7
 */
(function ($) {
  $.fn.readmore = function (settings) {

    var defaults = {
      substr_len: 500,
      speed: 500,
      split_word: false,
      ellipses: '&#8230;',
      more_link: '<a class="readm-more">Read&nbsp;more</a>',
      more_clzz: 'readm-more',
      show_hide: true,
      less_link: '<a class="readm-less">Hide</a>',
      less_clzz: 'readm-less',
      ellipse_clzz: 'readm-continue',
      hidden_clzz: 'readm-hidden'
    };

    var opts =  $.extend({}, defaults, settings);

    this.each(function () {
      var $this = $(this);
      if ($this.html().length > opts.substr_len) {
        abridge($this);
        linkage($this);
      }
    });

    function linkage(elem) {
      elem.append(opts.more_link);
      elem.find('.' + opts.more_clzz).click( function () {
        $(this).hide();
        elem.find('.' + opts.ellipse_clzz).hide();
        elem.find('.' + opts.hidden_clzz).animate({'opacity' : 'toggle'},opts.speed,'swing',function() {
          if (opts.show_hide) elem.find('.' + opts.less_clzz).show();
        });
      });
      if (opts.show_hide) {
        elem.find('.' + opts.less_clzz).click( function () {
          $(this).hide();
          elem.find('.' + opts.hidden_clzz).animate({'opacity' : 'toggle'},opts.speed,'swing',function() {
            elem.find('.' + opts.ellipse_clzz).show();
            elem.find('.' + opts.more_clzz).show();
          });
        });
      }
    }

    function abridge(elem) {
      var txt = elem.html();
      var dots = "<span class='" + opts.ellipse_clzz + "'>" + opts.ellipses + "</span>";
      var shown = txt.substring(0, (opts.split_word ? opts.substr_len : txt.indexOf(' ', opts.substr_len))) + dots;
      var hidden =
        '<span class="' + opts.hidden_clzz + '" style="display:none;">' +
          txt.substring((opts.split_word ? opts.substr_len : txt.indexOf(' ', opts.substr_len)), txt.length) +
          (opts.show_hide ? opts.less_link : '') +
        '</span>';
      elem.html(shown + hidden);
    }
    
    return this;
  };
})(jQuery);