export default class Checks{
    constructor(password){
        this.password = password;
    }

    lengthCheck(){
        if(this.password.length < 6) return {
            message: "Password is too short",
            deduction: 20
        }
        if(this.password.length <= 10) return {
            message:"Password can be longer",
            deduction: 15
        }
        return {
            message: "",
            deduction: 0
        };
    }
    lowerCaseCheck(){
        return this.checkCharacterLength(/[a-z]/g, 'lowercase characters');
    }
    upperCaseCheck(){
        return this.checkCharacterLength(/[A-Z]/g, "uppercase characters")
    }
    specialCharactersCheck(){
        return this.checkCharacterLength(/[^0-9a-zA-Z\s]/g, "special characters")
    }
    numberCharacterCheck(){
        return this.checkCharacterLength(/[0-9]/g, "numbers")
    }
    checkCharacterLength(regex, type){
        const matches = this.password.match(regex) || [];
        if(matches.length == 0) return {
            message: `Your password has no ${type}`,
            deduction: 20
        }
        if(matches.length < 6) return {
            message: "Please use more lowercase",
            deduction: 10
        }
        return {
            message: "",
            deduction: 0
        };
    }
}