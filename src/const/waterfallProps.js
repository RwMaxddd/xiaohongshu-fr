import loading from '../assets/loading.png'
import error from '../assets/error.png'

export const loadProps = {
    loading,
    error,
    ratioCalculator: (width, height) => {
        // 我设置了最小宽高比
        const minRatio = 3 / 4;
        const maxRatio = 4 / 3;
        // 获取当前图片的比例
        const curRatio = width / height;
        // 如果当前图片比列不在此范围内，我们取最小或者最大值
        if (curRatio < minRatio) {
            return minRatio;
        } else if (curRatio > maxRatio) {
            return maxRatio;
        } else {
            return curRatio;
        }
    }
}

export const breakpoints = {
    1600:{rowPerView:4},
    900:{rowPerView:3},
    700:{rowPerView:2},
    500:{rowPerView:1}
}