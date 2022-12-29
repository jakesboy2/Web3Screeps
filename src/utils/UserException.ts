export type ErrorLevel = "error" | "warning" | "info";
const Colors: {[color in ErrorLevel]: string;} = {
  error: '#E300FF',
  warning: '#F0FF00',
  info: '#0045FF',
}

export class UserException extends Error {
  public title: string;
  public body: string;
  public severity: ErrorLevel;
  public titleColor: string;
  public bodyColor: string;

  constructor(title: string, body: string, severity: ErrorLevel, useTitleColor?: string, useBodyColor?: string) {
    super();
    Object.setPrototypeOf(this, UserException.prototype);

    this.title = title;
    this.body = body;
    this.severity = severity;
    this.titleColor = useTitleColor !== undefined ? useTitleColor : Colors[severity];
    this.bodyColor = useBodyColor !== undefined ? useBodyColor : "#ff1113";
  }
}
