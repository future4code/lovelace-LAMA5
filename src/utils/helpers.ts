
/**
 * ####################
 * ###   VALIDATE   ###
 * ####################
 */

export const isEmail = (emailAddress: string): boolean => {
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (emailAddress.match(regexEmail)) {
        return true;
    }

    return false;
};

export const passwdLength = (password: string): boolean => {
    if ( 6 < password.length && password.length < 40 ) {
        return true;
    }

    return false;
};


/**
 * ################
 * ###   DATE   ###
 * ################
 */

// export const dateFmt = (date?: string, formatStr = 'dd/MM/yyyy'): string => {
//     if (!date) {
//         return format(new Date(), formatStr);
//     }
//     return format(new Date(date), formatStr);
// };


// export const dateFmtYmd = (date: string, formatStr = 'yyyy-MM-dd'): string => {
//     const newDate = date.split('/');

//     const day = Number(newDate[0]);
//     const month = Number(newDate[1]) - 1;
//     const year = Number(newDate[2]);

//     return format(new Date(year, month, day), formatStr);
// };

/**
 * ################
 * ###   MISC   ###
 * ################
 */