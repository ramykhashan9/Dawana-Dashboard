export class StringFun{
static    camilCaseMethod(value: string): string {
        let valueProccess = value.replace(/_/g, " ");
    
        valueProccess = valueProccess.toLowerCase();
        const valueList = valueProccess.split(" ");
    
        let camilCaseString = "";
        for (let i = 0; i < valueList.length; i++) {
          if (valueList[i].trim().length > 0) {
            const valueWord =
              valueList[i][0].toUpperCase() + valueList[i].substring(1);
            if (i !== valueList.length - 1) {
              camilCaseString += valueWord + " ";
            } else {
              camilCaseString += valueWord;
            }
          }
        }
        return camilCaseString;
      }
}