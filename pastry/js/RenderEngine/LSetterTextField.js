/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-9-28
 * Time: 上午9:15
 * To change this template use File | Settings | File Templates.
 */
function LSetterTextField(millionSecond,bottom,top){
    LTextField.call(this);
    this._value = 0;
}
LSetterTextField.prototype = Object.create(LTextField.prototype);
Object.defineProperty(LSetterTextField.prototype, "value", {
    get: function() {
        return this._value;
    },
    set: function(value){
        value = ~~value;
        this._value = value;
        this.text = this._value;
        this.text = util.convertIntFormat(this._value);
    },
    // enumerable: true,
    //writable: true,
    configurable: true
});