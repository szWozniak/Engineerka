//TODO: basically remove when doing anything with lines
const generatePath = (start: any, end: any, heights: any) => {
    const num = heights?.length
    const distanceX = ((end[0] - start[0]) / (num - 1))
    const distanceY = (end[1] - start[1]) / (num - 1)
  
    return heights.slice(0, num - 1).map((_: any, index: any) => ({
      start: [start[0] + distanceX * index, start[1] + distanceY * index, heights[index]],
      end: [start[0] + distanceX * (index + 1), start[1] + distanceY * (index + 1), heights[index + 1]],
    }))
  }
  
export const paths = generatePath([19.92, 50.0592], [19.9, 50.0671], Array.from({ length: 200 }, (_, index) => Math.round(200 * Math.pow(0.3, index / 100) + 20)))