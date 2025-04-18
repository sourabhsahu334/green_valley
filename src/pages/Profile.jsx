import { View, Text, Image, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { globalStyles } from '../utils/GlobalStyles'
import PageHeader from '../components/PageHeader'
import { http } from '../utils/AxiosInstance'
import theme from '../utils/theme'
import { CustomButton } from '../components/CustomButton'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Profile = ({ navigation }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchProfile = async () => {
        try {
            const { data } = await http.get('/', {
                params: {
                    method: "myProfile",
                }
            });
            console.log(data?.response, "data");
            setData(data?.response);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: '#f5f5f5', padding: 20 }}>
            <PageHeader name={'Profile'} navigation={navigation} />

            {loading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#007bff" />
                </View>
            ) : (
                <View style={{ alignItems: 'center', marginTop: 30 }}>
                    {/* Profile Image */}
                    <Image
                        source={{ uri: data?.userImage || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAY1BMVEUAAAD////7+/v29vbf39/n5+fs7OzIyMiJiYnBwcGlpaWUlJSXl5fw8PDLy8vQ0NAfHx9fX1+wsLA3NzcmJiYWFhaAgIBycnJNTU0NDQ24uLhDQ0NkZGR6enpSUlJaWlouLi60qsLoAAAFZElEQVR4nM2c65qyOgyFq4AcFFAEOTp6/1e5mfFzz1DakqSxsP4PzzttSdJkodjZaR9k8fFyLSvRVuV1OMbZwfKJo4QVkX8aeiGpHxJ/PSj/9CUDvfVIglWgDserDulnvU6pc6j0ZCJ6KfHcQmXGVXrrK3cI5d0gSN860haLAOUPUCYhatKBx0PlFZxJiJISHtBQ8RnDJMQ1+zxUjEP6Fv64I6Fi1N79Wys0FQ4qR+7dS2fsaUdBBQ2FSYgGSYWCutCYxsjwOShAatGp+BRUTmcST1S4QkBpCxWIUBsIhypsmITAxFAwVDArMXF6IHIzGMpyoYQI+aE8Yoj6VcMPlbW2UC0820ChwHWdXiduqMPTHqoBH3UgVGjPJCrwUQdCMezeeL1hhgLdXpZ054XiOFJjtQe9n8KgQuuA8C1wsQeD6jiYRAWNVDCohAUKXFXBoI48UNDwCYNiiQjjLZ4Tal/zQEWsUIjugTuoLa7UJs/ULuKB4n37mOIUNCPDoKwL9B+10NoFBkVoACnEnPt8UrdFVgkdRrispwZoPQyEYome3JUnS+3SMUMFDEw9eL4FhOJINPc9MxTH/sGbCVCo4GnL9IS3XcBdF4ve4kuIDiMYyrdcqidijAvv5FlWCphWLBzK7kLag189FJTVCwguELBQNpV6hFkoVHM/JaflHjchRY1BsLO+t0rkHAs3xSJWoKgDhYYi3d9bcMlChKJQoZnwM2R0DIU3helQ2OsWuLKzgtoViMhwjQlMJAeHD54dPWimJZLXJY1APdCKasEhuoIywETyQvZ2kf1ThRmrvZBOkyXULu0u2k2shphsnrKCGuUXD8WbeB0KS1OeFdRu5/nd6fLHalIOpy6wWSQMlOfned4loa+ui/ZBnmW+liYd/zQeH6D5axKUl0WP92pQXqmw+V1HH7KMi1BpIRWcNRIrn76m7T1c5FqC6ub+lh6T9r1oVhie70s1nxmqUCeUB7iS7J7KBwzmBxihtMXTGbZYqbbVXRmLBwOU0bPR5ItvkteZMuTdcLL0UKG5FjjfFg58tuC2MrgttVC++ZGj2luu/W8P8fIl8ar9ax0UqGaqHuriJDg2kNqm1lFpoNIS8NDXk4tp3DnECdhopTNVqaG8O/S5o9p+OP5kkaxLIlWG1kvzEquhmGYxi9JcnZVQAXjzbHVRBhYV1B6zeZZS9tJUUDzjIZiULmwVFMsgBqobDIrHrgGWIrDPoTwrPydeimn3HIpnCgqX4lTNoZg8CHDNZ/AzKNwnDByae/VmUK6C+R/NwroMlT7cQ93ksC5D2fi7qWrksY0MtcLuzbvHMpTjIPWSXMFIUAcWAwJWvRnKcYr5p/PBCGU9/6SpMEFxubewSkxQ6SpHarxB7A1QHJ4Iip6pAcp1hfC/AgMUk80Nr8wAtdI5l0/6FIr8BZitIj1Uav0dClW1HsrWpUHXRQ/lvup8a+qtmkDxGPQpmn5qN4FaLUxJpv4J1GphSrKd/IXaM/mWKYq1UA67LbI6LdRqAV2qqCZQzi/Hv0q2CHXSQq2W+qTkt3kob4Ur+1uTq/tWoO46qE1u3zbfvi1G9E0m5HX6QEtQLkcNU5X6Ii9wOmv4K0ONvskr1lqdICF8A9TyNPszMjY41ko00tBB6uSt8/7JH2nJ3eFVMo1smpWhshWYennkJ0PtV0g1sznybGDkOd/A+RRyPu+Dm3B5VM9dAIoZMs9nj1CpPn9QTdtDhylQaTxUOjgOzs6V+tMVjQGH6bcIlqQxwen8U2H98a5eGem8Zlqn2T78bLujjfQORpN70U/mPyHKo6YuTB9KL5hPgyy5Dc2TbSur61d96/KF31L5DzWvSdQf1xFIAAAAAElFTkSuQmCC' }}
                        style={{
                            width: 120,
                            height: 120,
                            borderRadius: 60,
                            borderWidth: 3,
                            borderColor: theme.colors.primary,
                        }}
                    />

                    {/* Profile Name & Email */}
                    <Text style={[globalStyles.text, { fontSize: 22, fontWeight: 'bold', marginTop: 15 }]}>{data?.userName}</Text>
                    <Text style={[globalStyles.text, { fontSize: 16, color: '#777', marginTop: 5 }]}>{data?.userEmail}</Text>
                    <Text style={[globalStyles.text, { fontSize: 16, color: '#777', marginTop: 5 }]}>{data?.userMobile}</Text>

                    {/* Stats Section */}
                    {/* <View style={{ flexDirection: 'row', marginTop: 20, width: '90%', justifyContent: 'space-around' }}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>12</Text>
                            <Text style={{ fontSize: 14, color: '#777' }}>Posts</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>120</Text>
                            <Text style={{ fontSize: 14, color: '#777' }}>Followers</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>80</Text>
                            <Text style={{ fontSize: 14, color: '#777' }}>Following</Text>
                        </View>
                    </View> */}

            
                </View>
            )}
            <CustomButton text={'Log Out'} style={{marginTop:"auto"}} onPressfuntion={()=>{navigation.replace('Login'); AsyncStorage.removeItem('UserID')}}/>
        </View>
    );
};

export default Profile;
