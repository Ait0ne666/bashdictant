import React, { Fragment } from 'react';
import {Overlay} from 'react-native-elements';


import { IExpert, IStudent } from '../../../@types/common';
import { useLanguage } from '../../LanguageProvider/language.provider';
import {
    InfoContainer,
    InfoField,
    InfoHeader,
    InfoText,
    SubTitle,
    IconButton
} from './participation-popup.styles';
import ExitSVG from '../../../assets/times.svg';



interface PopupProps {
    visible: boolean,
    toggleOverlay: (user?: IStudent | IExpert | undefined) => void,
    user: IStudent|IExpert|undefined
}


const ParticipationPopup: React.FC<PopupProps> = ({toggleOverlay,visible, user}) => {
    
    const {language} = useLanguage()

    const getTestFormat = (type: "offline" | "online" | "video") => {
        return language.participation.form.testFormat[type]
    }
    
    return (
        <Overlay
        isVisible={visible}
        onBackdropPress={() => toggleOverlay()}
        overlayStyle={{
            width: '90%',
            borderRadius: 12,
        }}
        animationType='slide'
        >   
            <Fragment>
                <IconButton onPress={() => toggleOverlay()}>
                    <ExitSVG width={30} height={30}/>
                </IconButton>
                <InfoContainer>
                    <InfoHeader>
                        {user?.type==='expert'? language.participation.form.headerExpert: language.participation.form.headerExpert}
                    </InfoHeader>
                    <InfoField>
                        <InfoText>
                            {user?.email}
                        </InfoText>
                    </InfoField>
                    <InfoField>
                        <InfoText>
                            {user?.lastName}
                        </InfoText>
                    </InfoField>
                    <InfoField>
                        <InfoText>
                            {user?.firstName}
                        </InfoText>
                    </InfoField>
                    <InfoField>
                        <InfoText>
                            {user?.middleName}
                        </InfoText>
                    </InfoField>
                    <InfoField>
                        <InfoText>
                            {user?.city}
                        </InfoText>
                    </InfoField>
                    {
                        user?.type==='student'?
                        <Fragment>
                            <SubTitle>
                                {language.participation.form.subheader}
                            </SubTitle>
                            <InfoText>
                                {getTestFormat((user as IStudent).dictantType)}
                            </InfoText>
                        </Fragment>
                        :null
                    }

                </InfoContainer>
            </Fragment>
        </Overlay>
    )
}



export default ParticipationPopup;