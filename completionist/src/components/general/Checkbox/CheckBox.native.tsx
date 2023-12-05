import React, { useEffect, useState } from 'react';
import useMainDispatch from 'src/redux/hooks/useMainDispatch.native';
import useMainState from 'src/redux/hooks/useMainState.native';
import useGetTheme from '../../../styles/hooks/useGetTheme';

interface StyledCheckBoxProps {
  id: string;
}

import { IconTypeEnum } from '@utils/CustomEnums';
import Icon from '../Icon/Icon.native';
import { StyledCheckBox } from './CheckBoxStyledComponents.native';

const CheckBox = ({ id }: StyledCheckBoxProps) => {
  const theme = useGetTheme();
  const { setCompletedBookIds } = useMainDispatch();
  const { completedBookIds } = useMainState();
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  
  // TODO: Move this outside of checkbox
  useEffect(() => {
    setIsCompleted(!!completedBookIds.find(bookId => bookId === id));
  }, [completedBookIds]);

  const addOrRemoveBook = () => {
    if (isCompleted) {
      setCompletedBookIds(completedBookIds.filter(bookId => bookId !== id));
    }
    else {
      const updatedCompletedBooks = [...completedBookIds, id]
      setCompletedBookIds(updatedCompletedBooks);
    }
  };

  return (
    <StyledCheckBox onPress={addOrRemoveBook}>
      <Icon
        name={isCompleted ? 'checkmark-circle-outline' : 'radio-button-unchecked'}
        type={isCompleted ? IconTypeEnum.Ionicons : IconTypeEnum.MaterialIcons}
        size={35}
        color={isCompleted ? theme.primaryPurple : theme.lightGrey}
      />
    </StyledCheckBox>
  );
};

export default CheckBox;

// With Animation

// import { StyledCheckBox } from './CheckBoxStyledComponents.native';
// import BouncyCheckbox from "react-native-bouncy-checkbox";

// const CheckBox = ({ id }: StyledCheckBoxProps) => {
//   const theme = useGetTheme();
//   const { setCompletedBookIds } = useMainDispatch();
//   const { completedBookIds } = useMainState();
//   const [isCompleted, setIsCompleted] = useState<boolean>(false);

//   useEffect(() => {
//     setIsCompleted(!!completedBookIds.find(bookId => bookId === id));
//   }, [completedBookIds]);

//   const addOrRemoveBook = () => {
//     if (isCompleted) {
//       setCompletedBookIds(completedBookIds.filter(bookId => bookId !== id));
//     }
//     else {
//       const updatedCompletedBooks = [...completedBookIds, id]
//       setCompletedBookIds(updatedCompletedBooks);
//     }
//   };

//   return (
//     <BouncyCheckbox 
//       isChecked={isCompleted}
//       fillColor={isCompleted ? theme.lightPurple : theme.lightGrey}
//       onPress={() => addOrRemoveBook()}
//     />
//   );
// };

// export default CheckBox;

// import React from 'react';
// import useGetTheme from '../../../styles/hooks/useGetTheme';
// import { StyledCheckBox } from './CheckBoxStyledComponents.native';

// interface StyledCheckBoxProps {
//   isToggled: boolean;
//   action: () => void;
// }

// const CheckBox = ({ isToggled, action }: StyledCheckBoxProps) => {
//   const theme = useGetTheme();

//   // Rendering twice but onValueChange is only running one
//   return (
//     <StyledCheckBox
//       disabled={false}
//       value={isToggled}
//       // TODO: Set dynamic color based on selected theme
//       onCheckColor={theme.lightPurple}
//       onTintColor={theme.lightPurple}
//       onValueChange={() => {
//         console.log("VALUE CHANGING TO: ", !isToggled)
//         action();
//       }}
//     />
//   );
// };

// export default CheckBox;