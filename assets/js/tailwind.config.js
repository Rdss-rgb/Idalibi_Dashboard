tailwind.config = {
    darkMode: 'class',
    theme: {
         extend: {
             colors: {
                       modal: '#ffffff75',
                       grayish: '#dcdcdc',
                       darkish: '#000000d6',
                     },
             fontSize:{
                        '10xl': ['15rem', { }]
                     },
             scale: {
                     '1.1': '1.1',
                    },
                    keyframes:{
                        pulsed:{
                            '0%' : {
                                transform: 'scale(0.95)',
                                boxShadow: '0 0 0 0 rgba(52, 172, 224, 0.7)'
                            },
                            '70%': {
                                transform: 'scale(1)',
                                boxShadow: '0 0 0 16px rgba(52, 172, 224, 0)'
                            },
                            '100%' : {
                                transform: 'scale(0.95)',
                                boxShadow: '0 0 0 0 rgba(52, 172, 224, 0)'
                            },
                        },
                        moveit:{
                            '0%' : {
                                transform: 'rotate(0deg) ',
                            },
                            '100%' : {
                                transform: 'rotate(-65deg)',

                            },
                        },
                        animation: {
                            pusled: 'pulsed 2s infinite',
                          },
                       }
                }
}
}