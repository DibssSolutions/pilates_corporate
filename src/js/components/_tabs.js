import {ACTIVE, OPEN, DISABLED, BODY,WIN_WIDTH,widthMD} from '../constants';

export default (() => {

  class Tabs {

    constructor(options) {
      this.cache = {};
      this.options = options || {};
      if (options.hover) {
        this.initHover();
      } else {
        this.init();
      }
    }

    init() {
      this.initializeCache();
      this.initializeEvents();
      this.mobDrop();
    }

    initHover() {
      this.initializeCache();
      this.initializeEventsHover();
      this.mobDrop();
    }

    initializeCache() {
      const {main} = this.options;
      this.cache.main = main;
      this.cache.controls = main.find('[data-tabs-control]');
      this.cache.mobileControls = main.find('[data-mobile-control]');
      this.cache.containers = main.find('[data-tabs-container]');
      this.cache.current = main.find('[data-tabs-current]');
    }

    initializeEvents() {
      this.setActiveOnLoad();
      this.setActiveOnClick();
    }

    initializeEventsHover() {
      this.setActiveOnLoad();
      this.setActiveOnHover();
    }

    setActiveOnLoad() {
      const {controls, containers} = this.cache;
      for (let i = 0; i < controls.length; i++) {
        const control = $(controls[i]);
        const container = this.getTabContainer(control, containers);

        if (this.checkTabState(control, container)) {
          control.addClass(DISABLED);
          continue;
        }
        // if(container.hasClass('js-no-init-active') && (WIN_WIDTH < widthMD)) continue;
        this.setActiveTab(control, container);
        break;
      }
    }

    setActiveOnClick() {
      const {controls, containers} = this.cache;
      controls.each((i, control) => {
        control = $(control);
        const container = this.getTabContainer(control, containers);

        control.on('click', e => {
          console.log(222);
          e.preventDefault();
          if (this.checkTabState(control, container)|| control.hasClass(ACTIVE)) return;
          controls.removeClass(ACTIVE);
          containers.removeClass(OPEN);
          this.setActiveTab(control, container);
        });
        control.on('touchend', e => {
          e.preventDefault();
          if (this.checkTabState(control, container)|| control.hasClass(ACTIVE)) return;
          controls.removeClass(ACTIVE);
          containers.removeClass(OPEN);
          this.setActiveTab(control, container);
        });
      });
    }

    setActiveOnHover() {
      const {controls, containers} = this.cache;
      controls.each((i, control) => {
        control = $(control);
        const container = this.getTabContainer(control, containers);

        control.on('mouseenter', e => {
          let winWidth = this.getWindowWidth();
          if (winWidth > widthMD) {
            if (this.checkTabState(control, container)|| control.hasClass(ACTIVE)) return;
            controls.removeClass(ACTIVE);
            containers.removeClass(OPEN);
            this.setActiveTab(control, container);
          }
        });
        control.on('mouseleave', e => {
          controls.removeClass(ACTIVE);
        });
        control.on('click', e => {
          let winWidth = this.getWindowWidth();
          if (winWidth < widthMD) {
            if (control.hasClass('js-mobile-control')) {
              e.preventDefault();
              if (this.checkTabState(control, container)|| control.hasClass(ACTIVE)) return;
              controls.removeClass(ACTIVE);
              containers.removeClass(OPEN);
              this.setActiveTab(control, container);
            }
          }
        });
      });

    }

    //utils
    checkTabState(control, container) {
      return control.hasClass(DISABLED) || control.attr('disabled') || !container.length;
    }

    getWindowWidth() {
      return $(window).width();
    }

    getTabContainer(control, containers) {
      return containers.filter(`[data-tabs-container="${control.data('tabs-control')}"]`);
    }

    setActiveTab(control, container) {
      const content = control.html();
      this.cache.main.attr('data-tabs', control.data('tabs-control'));
      this.cache.current.html(content);
      control.addClass(ACTIVE);
      container.addClass(OPEN);
    }

    mobDrop() {
      this.cache.current.on('click', () => {
        (!this.cache.main.hasClass(OPEN))
          ? this.cache.main.addClass(OPEN)
          : this.cache.main.removeClass(OPEN);
      });
      BODY.on('click touchend', e => {
        if ($(e.target).closest(this.cache.current).length || !this.cache.main.hasClass(OPEN)) return;
        this.cache.main.removeClass(OPEN);
      });
    }

  };

  $('[data-tabs]').each((i, main) => new Tabs({ main: $(main) }) );
  $('[data-tabshover]').each((i, main) => new Tabs({ main: $(main), hover: true}) );

})();
