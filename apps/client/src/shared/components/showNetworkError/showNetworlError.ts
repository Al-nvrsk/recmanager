import toast from 'react-hot-toast';

export const showNetworkError = (text?: string) => {
    console.log('tosted')
    toast(text || 'Что-то пошло не так, попробуйте снова', {
        position: 'top-center',
        icon: '⚠️',
    });
};
