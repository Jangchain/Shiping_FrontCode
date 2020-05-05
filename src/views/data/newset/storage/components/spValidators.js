export class SpValidators {
  // 必填
  static required(msg, trigger = "blur") {
    return { required: true, message: msg || "必填项", trigger };
  }

  // 校验最小长度
  static minLength(min, trigger = "blur") {
    return {
      validator: (rule, value, callback) => {
        if (value && value.length <= min) {
          callback(new Error('长度不能小于' + min));
        }
        callback();
      },
      trigger
    };
  }

   // 校验最大长度
  static maxLength(max, trigger = "blur") {
    return {
      validator: (rule, value, callback) => {
        if (value && value.length >= max) {
          callback(new Error('长度不能大于' + max));
        }
        callback();
      },
      trigger
    };
  }

  // 校验ip格式
  static ip(trigger = "blur") {
    const reg = /^\b((?!\d\d\d)\d+|1\d\d|2[0-4]\d|25[0-5])\.((?!\d\d\d)\d+|1\d\d|2[0-4]\d|25[0-5])\.((?!\d\d\d)\d+|1\d\d|2[0-4]\d|25[0-5])\.((?!\d\d\d)\d+|1\d\d|2[0-4]\d|25[0-5])\b$/;
    return {
      validator: (rule, value, callback) => {
        if (value && !reg.test(value)) {
          callback(new Error("请输入正确ip"));
        }
        callback();
      },
      trigger
    };
  }

  // 校验域名格式
  static domain(trigger = "blur") {
    const reg = /^[0-9a-zA-Z]+[0-9a-zA-Z\.-]*\.[a-zA-Z]{2,10}$/;
    return {
      validator: (rule, value, callback) => {
        if (value && !reg.test(value)) {
          callback(new Error("请输入正确的域名"));
        }
        callback();
      },
      trigger
    };
  }

  // 校验端口格式
  static port(min = 1, max = 65535, symbol = ";", trigger = "blur") {
    const reg = new RegExp("^(([0-9]+)|([0-9]+[" + symbol + "][0-9]+)+)$");
    return {
      validator: (rule, value, callback) => {
        if (value && !reg.test(value)) {
          callback(new Error("端口号必须为整数"));
        }
        console.log('value', value.toString())
        const valueArr = value.toString().split(symbol);
        for (let i = 0; i < valueArr.length; i++) {
          if (Number(valueArr[i]) < min) {
            callback(new Error("不能小于" + min));
          }
          if (Number(valueArr[i]) > max) {
            callback(new Error("不能大于" + max));
          }
        }
        callback();
      },
      trigger
    };
  }

  static userNameIllegal(trigger = "blur") {
    const reg = /^[^<>'":\\/*+=${}?|&%]+$/;
    return {
      validator: (rule, value, callback) => {
        if (value && !reg.test(value)) {
          callback(new Error(`不能包含非法字符<>'":\/*+=\${}?|&%`));
        }
        callback();
      },
      trigger
    };
  }
}
