//creating a validator which takes in an array

export class Validator {
  // Regular expression to match the yyyy-mm-dd format,
  // limit the month to 01-12, the year to 1900-2023, and the day to 01-31
  private readonly   specialChars = /[`!@#$%^&*_+\-=\[\]{};':"\\|,.<>\/?~]/;
  private readonly emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex for demonstration purposes
  private readonly dateRegex = /^(19[0-9]{2}|20[0-2][0-3])-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
  ;
  
    wordValidator = (word: string): boolean => {
      let status = false;
      if (word.trim().length !== 0 && !this.specialChars.test(word)) {
        status = true;
      }
      return status;
    };
  
    numValidator = (num: number): boolean => {
      let status = false;
      if (!isNaN(num) && num != 0) {
        status = true;
      }
      return status;
    };
  
    emailValidator = (email: string): boolean => {
      let status = false;
      if (this.emailRegex.test(email)) {
        status = true;
      }
      return status;
    };

    dateValidator = (date: string): boolean => {
      return this.dateRegex.test(date);
    }
  }