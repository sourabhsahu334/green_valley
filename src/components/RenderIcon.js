import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Zocial from 'react-native-vector-icons/Zocial';
import theme from '../utils/theme';

export const RenderIcon = ({
    iconName,
    iconfrom,
    iconSize,
    iconColor,
    iconProps,
    styles
}) => {
    switch (iconfrom) {
        case 'MaterialCommunityIcons':
            return <MaterialCommunityIcon name={iconName} size={iconSize} color={iconColor || theme.colors.textinputVAlue} style={styles} {...iconProps} />;
        case 'AntDesign':
            return <AntDesign name={iconName} size={iconSize} color={iconColor || theme.colors.textinputVAlue} style={styles} {...iconProps} />;
        case 'Entypo':
            return <Entypo name={iconName} size={iconSize} color={iconColor || theme.colors.textinputVAlue} style={styles} {...iconProps} />;
        case 'EvilIcons':
            return <EvilIcons name={iconName} size={iconSize} color={iconColor || theme.colors.textinputVAlue} style={styles} {...iconProps} />;
        case 'Feather':
            return <Feather name={iconName} size={iconSize} color={iconColor || theme.colors.textinputVAlue} style={styles} {...iconProps} />;
        case 'FontAwesome':
            return <FontAwesome name={iconName} size={iconSize} color={iconColor || theme.colors.textinputVAlue} style={styles} {...iconProps} />;
        case 'FontAwesome5':
            return <FontAwesome5 name={iconName} size={iconSize} color={iconColor || theme.colors.textinputVAlue} style={styles} {...iconProps} />;
        case 'FontAwesome5Pro':
            return <FontAwesome5Pro name={iconName} size={iconSize} color={iconColor || theme.colors.textinputVAlue} style={styles} {...iconProps} />;
        case 'FontAwesome6':
            return <FontAwesome6 name={iconName} size={iconSize} color={iconColor || theme.colors.textinputVAlue} style={styles} {...iconProps} />;
        case 'Foundation':
            return <Foundation name={iconName} size={iconSize} color={iconColor || theme.colors.textinputVAlue} style={styles} {...iconProps} />;
        case 'Ionicons':
            return <Ionicons name={iconName} size={iconSize} color={iconColor || theme.colors.textinputVAlue} style={styles} {...iconProps} />;
        case 'MaterialIcons':
            return <MaterialIcons name={iconName} size={iconSize} color={iconColor || theme.colors.textinputVAlue} style={styles} {...iconProps} />;
        case 'Octicons':
            return <Octicons name={iconName} size={iconSize} color={iconColor || theme.colors.textinputVAlue} style={styles} {...iconProps} />;
        case 'SimpleLineIcons':
            return <SimpleLineIcons name={iconName} size={iconSize} color={iconColor || theme.colors.textinputVAlue} style={styles} {...iconProps} />;
        case 'Zocial':
            return <Zocial name={iconName} size={iconSize} color={iconColor || theme.colors.textinputVAlue} style={styles} {...iconProps} />;
        default:
            return null;
    }
};
