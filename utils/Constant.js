module.exports = {
 VIDEO_GET_A_ALL: 'getAll',
 VIDEO_GET_A_STAR: 'getStar',
 VIDEO_GET_A_HOT: 'getHot',
 VIDEO_POST_ADD: 'add',
 VIDEO_POST_RESET: 'reset',
 MEM_CACHE_TTL_HOT: 3600,
 MEM_CACHE_TTL_START: 3600 * 10,
 MEM_CACHE_TTL_ALL: 3600 * 20,

 USER_A_REGISTER: 'register',
 USER_A_LOGIN: 'login',
 USER_A_SET_SHARE: 'setShare',
 USER_A_SET_VIP: 'setVip',


 STATUS_CODE_OK: 0,
 STATUS_CODE_ERROR: -1,
 STATUS_USER_EXISTED: -2,
 STATUS_USER_NOT_EXISTED: -3,
 STATUS_USER_EXISTED_MESSAGE: 'User already registered!',
 STATUS_USER_NOT_EXISTED_MESSAGE: 'User not exist, we created one for you',
 STATUS_ERROR_MESSAGE: 'Server is busy now, plz try again a later',
 STATUS_OK_MESSAGE: 'OK'

}