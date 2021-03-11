import {BaseModel} from '../../../Common/BaseModel';
import {ScreenStep, screenStepProps} from './ScreenStep';
import {navigator} from '../../../Core/Navigator';

type stepsModel = {
  id: string;
  steps: Array<any>;
};

class StepsModel extends BaseModel {
  private _steps: Array<ScreenStep>;
  private _history: Array<ScreenStep>;
  private _initialSteps: Array<screenStepProps>;
  constructor(_model: stepsModel) {
    super(_model.id);
    this._initialSteps = _model.steps;
    this._steps = new Array();
    this._history = new Array();
    this.initSteps();
  }

  initSteps() {
    this._steps = this._initialSteps.map(
      (step, index) =>
        new ScreenStep({
          id: `step${index}`,
          name: step.name,
          historyProtect: step.historyProtect || false,
          isVisible:
            step.isVisible !== undefined ? step.isVisible : index === 0,
        }),
    );
    const choosedStep = this._steps.find((s) => s.isVisible);
    this.pushToHistory(choosedStep)
  }

  get stepsNames() {
    return this._steps.map((s) => s.name);
  }

  get steps() {
    return this._steps;
  }

  pushToHistory(choosedStep: ScreenStep | undefined){
    if(choosedStep && !choosedStep.historyProtect){
      this._history.push(choosedStep);
    }
  }

  changeStep(stepName: string) {
    this._steps.forEach((s) => {
      s.isVisible = s.name === stepName;
    });
    const choosedStep = this._steps.find((s) => s.isVisible);
    this.pushToHistory(choosedStep)
  }

  changeStepByIndex(stepNumber: number) {
    this._steps.forEach((s, i) => {
      s.isVisible = i === stepNumber;
    });
    const choosedStep = this._steps.find((s) => s.isVisible);
    this.pushToHistory(choosedStep)
  }
  goToLastStep() {
    this._history.splice(-1, 1)[0];
    const lastStep = this._history[this._history.length - 1];
    if (lastStep) {
      const currentStep = this._steps.find((st) => st.isVisible === true);
      if (currentStep) {
        currentStep.isVisible = false;
      }
      lastStep.isVisible = true;
    } else {
      navigator().toGoBack();
    }
  }

  clearHistory(withHistoryPush = true) {
    this._history = [];
    if(withHistoryPush){
      this._history.push(this._steps[0]);
    }
  }
}

export {StepsModel};
