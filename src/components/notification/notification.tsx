import { Box, Card, Divider, Typography, useTheme } from '@mui/material'
import { INotification } from '../../interfaces/notification'
import { defaultLang, useTranslations } from '../../translation'
import React from 'react'
import { Language } from '../../utils/constants'

interface NotificationProps {
    notifications: INotification[]
    newNotificationIndices: number[]
}

const Notification = ({ notifications, newNotificationIndices }: NotificationProps) => {
    const language = localStorage.getItem('i18nextLng') || defaultLang.value
    const theme = useTheme()
    const { t } = useTranslations()

    const isNewNotification = (index: number) => {
        return newNotificationIndices.includes(index)
    }

    return (
        <Card sx={{ position: 'absolute', top: '60px', right: '10px', width: '35vh', padding: 2 }}>
            <Typography variant="h6">{t('connectedSideBar.notifications')}</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, maxHeight: '30vh', overflowY: 'auto' }}>
                {notifications.map((msg: INotification, index: number) => (
                    <React.Fragment key={index}>
                        <Typography
                            color={isNewNotification(index) ? theme.palette.primary.main : theme.palette.common.black}
                            sx={{ fontWeight: isNewNotification(index) ? 600 : 400 }}
                        >
                            {language === Language.FR ? msg.messageFr : msg.messageEn}
                        </Typography>
                        {index !== notifications.length - 1 && <Divider />}
                    </React.Fragment>
                ))}
            </Box>
        </Card>
    )
}

export default Notification
