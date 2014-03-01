/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-7
 * Time: 下午12:06
 * To change this template use File | Settings | File Templates.
 */
function processAnimal(currentGridContainer,currentAnimal){
    var scopeResult =  aiAnimal.analyseAnimalResult(currentGridContainer,currentAnimal);
    aiAnimal.doAnimalCheck(scopeResult);
}