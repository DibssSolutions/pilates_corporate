import { OPEN, ACTIVE, BODY, OVERFLOW_HIDDEN, ANIMATE } from '../constants';

(() => {
  const controls = $('[data-modal-control]');
  const modals = $('[data-modal]');
  controls.each((i, control) => {
    control = $(control);
    const modal = modals.filter(
      `[data-modal="${control.data('modal-control')}"]`
    );
    const btns = modal.find('.js-animated-btn');

    control.on('click', e => {
      e.preventDefault();
      if (!control.hasClass(ACTIVE)) {
        modals.removeClass(OPEN);
        modal.addClass(OPEN);
        controls.removeClass(ACTIVE);
        control.addClass(ACTIVE);
        $(btns).each((index, el) => $(el).addClass(ANIMATE));
      } else {
        modal.removeClass(OPEN);
        control.removeClass(ACTIVE);
      }
    });
  });

  modals.each((i, modal) => {
    modal = $(modal);
    const inner = modal.find('[data-modal-container]');
    const close = modal.find('[data-modal-close]');

    const hide = () => {
      modal.removeClass(OPEN);
      controls.removeClass(ACTIVE);
    };

    BODY.on('click', e => {
      if (
        $(e.target).closest(inner).length ||
        $(e.target).closest(close).length ||
        $(e.target).closest(controls).length
      )
        return;
      hide();
    });

    close.on('click', e => {
      e.preventDefault();
      hide();
    });
  });
})();
// ----------------------  HTML EXEMPLE ---------------------
// <a href="#" data-modal-control="modalname"></a> ---- trigger
// <div class="modal" data-modal="modalname"> ------ modal window
//     <div class="modal__container" data-modal-container>
//       <div class="modal__inner">
//         <button class="modal__close" data-modal-close>
//           {{mixins.icon('close')}}
//         </button>

//       </div>
//     </div>
//   </div>
