
import { publicDuplicate } from "@/api/data/newset";
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
          callback(new Error("长度不能小于" + min));
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
          callback(new Error("长度不能大于" + max));
        }
        callback();
      },
      trigger
    };
  }

  // 校验ip格式
  static ip(msg = "请输入正确ip", trigger = "blur") {
    const reg = /^\b((?!\d\d\d)\d+|1\d\d|2[0-4]\d|25[0-5])\.((?!\d\d\d)\d+|1\d\d|2[0-4]\d|25[0-5])\.((?!\d\d\d)\d+|1\d\d|2[0-4]\d|25[0-5])\.((?!\d\d\d)\d+|1\d\d|2[0-4]\d|25[0-5])\b$/;
    return {
      validator: (rule, value, callback) => {
        if (value && !reg.test(value)) {
          callback(new Error(msg));
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

  // 校验掩码格式
  static mask(trigger = "blur") {
    const reg = /^(254|252|248|240|224|192|128|0)\.0\.0\.0|255\.(254|252|248|240|224|192|128|0)\.0\.0|255\.255\.(254|252|248|240|224|192|128|0)\.0|255\.255\.255\.(254|252|248|240|224|192|128|0)$/;
    return {
      validator: (rule, value, callback) => {
        if (value && !reg.test(value)) {
          callback(new Error("请输入正确掩码"));
        }
        callback();
      },
      trigger
    };
  }

  // 校验mac格式
  static mac(trigger = "blur") {
    const reg = /^(([A-Fa-f0-9]{2}-){5}[A-Fa-f0-9]{2})|(([A-Fa-f0-9]{2}:){5}[A-Fa-f0-9]{2})$/;
    return {
      validator: (rule, value, callback) => {
        if (value && !reg.test(value)) {
          callback(new Error("请输入正确mac地址"));
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
        console.log("value", value.toString());
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

  //  校验类型是否为为number
  static number(trigger = "blur") {
    const reg = /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/;
    return {
      validator: (rule, value, callback) => {
        if (value && !reg.test(value)) {
          callback(new Error(`请输入数字`));
        }
        callback();
      },
      trigger
    };
  }

  //  校验非法字符
  static illegal(trigger = "blur") {
    const reg = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/g;
    return {
      validator: (rule, value, callback) => {
        if (value && !reg.test(value)) {
          callback(new Error(`请输入汉字、字母、数字、下划线`));
        }
        callback();
      },
      trigger
    };
  }
  //  手机号
  static phone(trigger = "blur") {
    const reg = /^[1][3,4,5,7,8][0-9]{9}$/;
    return {
      validator: (rule, value, callback) => {
        if (value && !reg.test(value)) {
          callback(new Error(`请输入正确手机号`));
        }
        callback();
      },
      trigger
    };
  }
  //  邮箱
  static mail(trigger = "blur") {
    const reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    return {
      validator: (rule, value, callback) => {
        if (value && !reg.test(value)) {
          callback(new Error(`请输入正确邮箱地址`));
        }
        callback();
      },
      trigger
    };
  }
  //  重名校验
  static duplicate(params, trigger = "blur") {
    return {
      validator: async (rule, value, callback) => {
        params = Object.assign(params, { checkValue: value })
        await publicDuplicate(params).then(res => {
          if (res.code === 0) {
            callback(new Error(`输入内容已存在，请修改`))
          }
          callback()
        }).catch(err => {
          callback(new Error(`检验失败，请稍后再试！`))
        })
      },
      trigger
    };
  }
}


