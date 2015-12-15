Polymer({
  is: 'foo-baz',

  properties: {
    /**
     * `fancy` indicates that the element should don a monocle and tophat,
     * while checking its pocket watch.
     */
    fancy: Boolean,

    /**
     * Describes the author of the element, but is really just an excuse to
     * show off JSDoc annotations.
     *
     * @type {{name: string, image: string}}
     */
    author: {
      type: Object,
      // Use `value` to provide a default value for a property, by setting it
      // on your element's prototype.
      //
      // If you provide a function, as we do here, Polymer will call that
      // _per element instance_.
      //
      // We do that to ensure that each element gets its own copy of the
      // value, rather than having it shared across all instances (via the
      // prototype).
      value: function() {
        return {
          name:  'Dimitri Glazkov',
          image: 'http://addyosmani.com/blog/wp-content/uploads/2013/04/unicorn.jpg',
        };
      }
    },
  },

  // Element Lifecycle

  ready: function() {
    // `ready` is called after all elements have been configured, but
    // propagates bottom-up. This element's children are ready, but parents
    // are not.
    //
    // This is the point where you should make modifications to the DOM (when
    // necessary), or kick off any processes the element wants to perform.
  },

  attached: function() {
    // `attached` fires once the element and its parents have been inserted
    // into a document.
    //
    // This is a good place to perform any work related to your element's
    // visual state or active behavior (measuring sizes, beginning animations,
    // loading resources, etc).
  },

  detached: function() {
    // The analog to `attached`, `detached` fires when the element has been
    // removed from a document.
    //
    // Use this to clean up anything you did in `attached`.
  },

  // Element Behavior

  /**
   * Sometimes it's just nice to say hi.
   *
   * @param {string} greeting A positive greeting.
   * @return {string} The full greeting.
   */
  sayHello: function(greeting) {
    var response = greeting || 'Hello World!';
    return 'foo-baz says, ' + response;
  },

  /**
   * The `foo-baz-lasers` event is fired whenever `fireLasers` is called.
   *
   * @event foo-baz-lasers
   * @detail {{sound: String}}
   */

  /**
   * Attempt to destroy this element's enemies with a beam of light!
   *
   * Or, at least, dispatch an event in the vain hope that someone else will
   * do the zapping.
   */
  fireLasers: function() {
    this.fire('foo-baz-lasers', {sound: 'Pew pew!'});
  }
});
