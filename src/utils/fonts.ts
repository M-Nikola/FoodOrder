import {isIOS} from './functions';

const fonts = {
  INTER: {
    normal: isIOS ? 'Inter-Regular' : 'InterRegular',
    medium: isIOS ? 'Inter-Medium' : 'InterMedium',
    bold: isIOS ? 'Inter-Bold' : 'InterBold',
  },
};

export default fonts;

export const getFontFamily = (weight: 'normal' | 'medium' | 'bold') => {
  return fonts.INTER[weight];
};
