import {
    trigger,
    state,
    style,
    animate,
    transition
  } from '@angular/animations';
enum AnimationBoxStates {
    Void,
    Hidden,
    Showing
}
export class AnimationBox {
    static fadeInOut = [
        trigger('fadeInOut', [
            transition(
                AnimationBoxStates.Hidden
                + ' => ' +
                AnimationBoxStates.Showing,
                [
                    style({opacity:0}), //style only for transition transition (after transiton it removes)
                    animate(500, style({opacity:1})) // the new state of the transition(after transiton it removes)
                ]
            ),
            transition(
                AnimationBoxStates.Showing
                + ' => ' +
                AnimationBoxStates.Hidden
                , [
                    animate(500, style({opacity:0})) // the new state of the transition(after transiton it removes)
                ]
            )
        ])
    ];
    static States = AnimationBoxStates;
}

export {
    trigger,
    state,
    style,
    animate,
    transition
};