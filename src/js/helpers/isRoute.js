export default class isRoute {
  constructor(routeName) {
    this.routeName = routeName;
  }

  isCurrent() {
    return $("body").hasClass(this.routeName);
  }
}
