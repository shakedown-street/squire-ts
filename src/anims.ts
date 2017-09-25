import { AnimationDef } from './squire';

export class HeavyArmorSwordShield extends AnimationDef {

  public getImageUrl(): any {
    return "assets/heavy_armor_sword_shield.png";
  }

  public animations = {
    walk: {
      duration: 60,
      frames: [
        [0, 0, 2882, 1045, 96, 96, 0, 0],
        [1, 0, 2978, 1045, 96, 96, 0, 0],
        [2, 0, 3074, 1045, 96, 96, 0, 0],
        [3, 0, 3170, 1045, 96, 96, 0, 0],
        [4, 0, 3266, 1045, 96, 96, 0, 0],
        [5, 0, 3362, 1045, 96, 96, 0, 0],
        [6, 0, 3458, 1045, 96, 96, 0, 0],
        [7, 0, 3554, 1045, 96, 96, 0, 0],
        [0, 1, 2882, 1142, 96, 96, 0, 0],
        [1, 1, 2978, 1142, 96, 96, 0, 0],
        [2, 1, 3074, 1142, 96, 96, 0, 0],
        [3, 1, 3170, 1142, 96, 96, 0, 0],
        [4, 1, 3266, 1142, 96, 96, 0, 0],
        [5, 1, 3362, 1142, 96, 96, 0, 0],
        [6, 1, 3458, 1142, 96, 96, 0, 0],
        [7, 1, 3554, 1142, 96, 96, 0, 0],
        [0, 2, 2882, 1239, 96, 96, 0, 0],
        [1, 2, 2978, 1239, 96, 96, 0, 0],
        [2, 2, 3074, 1239, 96, 96, 0, 0],
        [3, 2, 3170, 1239, 96, 96, 0, 0],
        [4, 2, 3266, 1239, 96, 96, 0, 0],
        [5, 2, 3362, 1239, 96, 96, 0, 0],
        [6, 2, 3458, 1239, 96, 96, 0, 0],
        [7, 2, 3554, 1239, 96, 96, 0, 0],
        [0, 3, 2882, 1336, 96, 96, 0, 0],
        [1, 3, 2978, 1336, 96, 96, 0, 0],
        [2, 3, 3074, 1336, 96, 96, 0, 0],
        [3, 3, 3170, 1336, 96, 96, 0, 0],
        [4, 3, 3266, 1336, 96, 96, 0, 0],
        [5, 3, 3362, 1336, 96, 96, 0, 0],
        [6, 3, 3458, 1336, 96, 96, 0, 0],
        [7, 3, 3554, 1336, 96, 96, 0, 0],
        [0, 4, 2882, 1433, 96, 96, 0, 0],
        [1, 4, 2978, 1433, 96, 96, 0, 0],
        [2, 4, 3074, 1433, 96, 96, 0, 0],
        [3, 4, 3170, 1433, 96, 96, 0, 0],
        [4, 4, 3266, 1433, 96, 96, 0, 0],
        [5, 4, 3362, 1433, 96, 96, 0, 0],
        [6, 4, 3458, 1433, 96, 96, 0, 0],
        [7, 4, 3554, 1433, 96, 96, 0, 0],
        [0, 5, 2882, 1530, 96, 96, 0, 0],
        [1, 5, 2978, 1530, 96, 96, 0, 0],
        [2, 5, 3074, 1530, 96, 96, 0, 0],
        [3, 5, 3170, 1530, 96, 96, 0, 0],
        [4, 5, 3266, 1530, 96, 96, 0, 0],
        [5, 5, 3362, 1530, 96, 96, 0, 0],
        [6, 5, 3458, 1530, 96, 96, 0, 0],
        [7, 5, 3554, 1530, 96, 96, 0, 0],
        [0, 6, 2882, 1627, 96, 96, 0, 0],
        [1, 6, 2978, 1627, 96, 96, 0, 0],
        [2, 6, 3074, 1627, 96, 96, 0, 0],
        [3, 6, 3170, 1627, 96, 96, 0, 0],
        [4, 6, 3266, 1627, 96, 96, 0, 0],
        [5, 6, 3362, 1627, 96, 96, 0, 0],
        [6, 6, 3458, 1627, 96, 96, 0, 0],
        [7, 6, 3554, 1627, 96, 96, 0, 0],
        [0, 7, 2882, 1724, 96, 96, 0, 0],
        [1, 7, 2978, 1724, 96, 96, 0, 0],
        [2, 7, 3074, 1724, 96, 96, 0, 0],
        [3, 7, 3170, 1724, 96, 96, 0, 0],
        [4, 7, 3266, 1724, 96, 96, 0, 0],
        [5, 7, 3362, 1724, 96, 96, 0, 0],
        [6, 7, 3458, 1724, 96, 96, 0, 0],
        [7, 7, 3554, 1724, 96, 96, 0, 0],
      ]
    },
    attack: {
      duration: 60,
      frames: [
        [0, 0, 0, 7, 128, 128, 0, 0],
        [1, 0, 128, 7, 128, 128, 0, 0],
        [2, 0, 256, 7, 128, 128, 0, 0],
        [3, 0, 384, 7, 128, 128, 0, 0],
        [4, 0, 512, 7, 128, 128, 0, 0],
        [5, 0, 640, 7, 128, 128, 0, 0],
        [6, 0, 768, 7, 128, 128, 0, 0],
        [7, 0, 896, 7, 128, 128, 0, 0],
        [8, 0, 1024, 7, 128, 128, 0, 0],
        [9, 0, 1152, 7, 128, 128, 0, 0],
        [10, 0, 1280, 7, 128, 128, 0, 0],
        [11, 0, 1408, 7, 128, 128, 0, 0],
        [12, 0, 1536, 7, 128, 128, 0, 0],
        [13, 0, 1664, 7, 128, 128, 0, 0],
        [14, 0, 1792, 7, 128, 128, 0, 0],
        [15, 0, 1920, 7, 128, 128, 0, 0],
        [0, 1, 0, 136, 128, 128, 0, 0],
        [1, 1, 128, 136, 128, 128, 0, 0],
        [2, 1, 256, 136, 128, 128, 0, 0],
        [3, 1, 384, 136, 128, 128, 0, 0],
        [4, 1, 512, 136, 128, 128, 0, 0],
        [5, 1, 640, 136, 128, 128, 0, 0],
        [6, 1, 768, 136, 128, 128, 0, 0],
        [7, 1, 896, 136, 128, 128, 0, 0],
        [8, 1, 1024, 136, 128, 128, 0, 0],
        [9, 1, 1152, 136, 128, 128, 0, 0],
        [10, 1, 1280, 136, 128, 128, 0, 0],
        [11, 1, 1408, 136, 128, 128, 0, 0],
        [12, 1, 1536, 136, 128, 128, 0, 0],
        [13, 1, 1664, 136, 128, 128, 0, 0],
        [14, 1, 1792, 136, 128, 128, 0, 0],
        [15, 1, 1920, 136, 128, 128, 0, 0],
        [0, 2, 0, 265, 128, 128, 0, 0],
        [1, 2, 128, 265, 128, 128, 0, 0],
        [2, 2, 256, 265, 128, 128, 0, 0],
        [3, 2, 384, 265, 128, 128, 0, 0],
        [4, 2, 512, 265, 128, 128, 0, 0],
        [5, 2, 640, 265, 128, 128, 0, 0],
        [6, 2, 768, 265, 128, 128, 0, 0],
        [7, 2, 896, 265, 128, 128, 0, 0],
        [8, 2, 1024, 265, 128, 128, 0, 0],
        [9, 2, 1152, 265, 128, 128, 0, 0],
        [10, 2, 1280, 265, 128, 128, 0, 0],
        [11, 2, 1408, 265, 128, 128, 0, 0],
        [12, 2, 1536, 265, 128, 128, 0, 0],
        [13, 2, 1664, 265, 128, 128, 0, 0],
        [14, 2, 1792, 265, 128, 128, 0, 0],
        [15, 2, 1920, 265, 128, 128, 0, 0],
        [0, 3, 0, 394, 128, 128, 0, 0],
        [1, 3, 128, 394, 128, 128, 0, 0],
        [2, 3, 256, 394, 128, 128, 0, 0],
        [3, 3, 384, 394, 128, 128, 0, 0],
        [4, 3, 512, 394, 128, 128, 0, 0],
        [5, 3, 640, 394, 128, 128, 0, 0],
        [6, 3, 768, 394, 128, 128, 0, 0],
        [7, 3, 896, 394, 128, 128, 0, 0],
        [8, 3, 1024, 394, 128, 128, 0, 0],
        [9, 3, 1152, 394, 128, 128, 0, 0],
        [10, 3, 1280, 394, 128, 128, 0, 0],
        [11, 3, 1408, 394, 128, 128, 0, 0],
        [12, 3, 1536, 394, 128, 128, 0, 0],
        [13, 3, 1664, 394, 128, 128, 0, 0],
        [14, 3, 1792, 394, 128, 128, 0, 0],
        [15, 3, 1920, 394, 128, 128, 0, 0],
        [0, 4, 0, 523, 128, 128, 0, 0],
        [1, 4, 128, 523, 128, 128, 0, 0],
        [2, 4, 256, 523, 128, 128, 0, 0],
        [3, 4, 384, 523, 128, 128, 0, 0],
        [4, 4, 512, 523, 128, 128, 0, 0],
        [5, 4, 640, 523, 128, 128, 0, 0],
        [6, 4, 768, 523, 128, 128, 0, 0],
        [7, 4, 896, 523, 128, 128, 0, 0],
        [8, 4, 1024, 523, 128, 128, 0, 0],
        [9, 4, 1152, 523, 128, 128, 0, 0],
        [10, 4, 1280, 523, 128, 128, 0, 0],
        [11, 4, 1408, 523, 128, 128, 0, 0],
        [12, 4, 1536, 523, 128, 128, 0, 0],
        [13, 4, 1664, 523, 128, 128, 0, 0],
        [14, 4, 1792, 523, 128, 128, 0, 0],
        [15, 4, 1920, 523, 128, 128, 0, 0],
        [0, 5, 0, 652, 128, 128, 0, 0],
        [1, 5, 128, 652, 128, 128, 0, 0],
        [2, 5, 256, 652, 128, 128, 0, 0],
        [3, 5, 384, 652, 128, 128, 0, 0],
        [4, 5, 512, 652, 128, 128, 0, 0],
        [5, 5, 640, 652, 128, 128, 0, 0],
        [6, 5, 768, 652, 128, 128, 0, 0],
        [7, 5, 896, 652, 128, 128, 0, 0],
        [8, 5, 1024, 652, 128, 128, 0, 0],
        [9, 5, 1152, 652, 128, 128, 0, 0],
        [10, 5, 1280, 652, 128, 128, 0, 0],
        [11, 5, 1408, 652, 128, 128, 0, 0],
        [12, 5, 1536, 652, 128, 128, 0, 0],
        [13, 5, 1664, 652, 128, 128, 0, 0],
        [14, 5, 1792, 652, 128, 128, 0, 0],
        [15, 5, 1920, 652, 128, 128, 0, 0],
        [0, 6, 0, 781, 128, 128, 0, 0],
        [1, 6, 128, 781, 128, 128, 0, 0],
        [2, 6, 256, 781, 128, 128, 0, 0],
        [3, 6, 384, 781, 128, 128, 0, 0],
        [4, 6, 512, 781, 128, 128, 0, 0],
        [5, 6, 640, 781, 128, 128, 0, 0],
        [6, 6, 768, 781, 128, 128, 0, 0],
        [7, 6, 896, 781, 128, 128, 0, 0],
        [8, 6, 1024, 781, 128, 128, 0, 0],
        [9, 6, 1152, 781, 128, 128, 0, 0],
        [10, 6, 1280, 781, 128, 128, 0, 0],
        [11, 6, 1408, 781, 128, 128, 0, 0],
        [12, 6, 1536, 781, 128, 128, 0, 0],
        [13, 6, 1664, 781, 128, 128, 0, 0],
        [14, 6, 1792, 781, 128, 128, 0, 0],
        [15, 6, 1920, 781, 128, 128, 0, 0],
        [0, 7, 0, 910, 128, 128, 0, 0],
        [1, 7, 128, 910, 128, 128, 0, 0],
        [2, 7, 256, 910, 128, 128, 0, 0],
        [3, 7, 384, 910, 128, 128, 0, 0],
        [4, 7, 512, 910, 128, 128, 0, 0],
        [5, 7, 640, 910, 128, 128, 0, 0],
        [6, 7, 768, 910, 128, 128, 0, 0],
        [7, 7, 896, 910, 128, 128, 0, 0],
        [8, 7, 1024, 910, 128, 128, 0, 0],
        [9, 7, 1152, 910, 128, 128, 0, 0],
        [10, 7, 1280, 910, 128, 128, 0, 0],
        [11, 7, 1408, 910, 128, 128, 0, 0],
        [12, 7, 1536, 910, 128, 128, 0, 0],
        [13, 7, 1664, 910, 128, 128, 0, 0],
        [14, 7, 1792, 910, 128, 128, 0, 0],
        [15, 7, 1920, 910, 128, 128, 0, 0],

      ]
    }
  };
}

export class SkeletonAnimation extends AnimationDef {

  public getImageUrl(): any {
    return "assets/skeleton.png";
  }

  public animations = {
    walk: {
      duration: 120,
      frames: [
        [0,0,475,662,53,60,34,56],
        [0,1,446,789,46,60,23,57],
        [0,2,362,528,47,62,20,58],
        [0,3,699,510,51,63,12,57],
        [0,4,719,254,52,61,15,56],
        [0,5,581,660,49,69,16,54],
        [0,6,859,384,47,67,18,54],
        [0,7,436,403,57,59,36,54],
        [1,0,949,522,44,59,24,55],
        [1,1,506,526,51,64,26,57],
        [1,2,903,452,46,63,20,57],
        [1,3,699,573,51,59,16,56],
        [1,4,854,451,49,63,16,55],
        [1,5,601,484,51,67,16,53],
        [1,6,801,577,50,63,22,53],
        [1,7,596,360,54,56,33,54],
        [2,0,449,287,53,57,27,54],
        [2,1,713,315,53,64,28,56],
        [2,2,900,576,46,63,19,56],
        [2,3,663,848,52,59,22,55],
        [2,4,299,651,58,65,22,54],
        [2,5,404,462,52,66,16,53],
        [2,6,766,318,53,63,25,52],
        [2,7,439,344,54,59,29,53],
        [3,0,851,581,49,59,25,55],
        [3,1,703,379,52,64,27,57],
        [3,2,676,632,46,63,20,57],
        [3,3,543,357,53,59,20,56],
        [3,4,659,307,54,64,20,55],
        [3,5,699,443,51,67,16,53],
        [3,6,409,528,51,62,23,53],
        [3,7,449,849,55,58,31,54],
        [4,0,926,245,53,59,34,56],
        [4,1,460,528,46,62,23,57],
        [4,2,946,581,47,62,20,58],
        [4,3,391,789,55,60,16,57],
        [4,4,750,511,52,61,15,56],
        [4,5,771,128,48,69,15,54],
        [4,6,853,514,47,67,18,54],
        [4,7,622,186,57,56,36,54],
        [5,0,170,466,66,59,49,55],
        [5,1,722,633,50,59,30,56],
        [5,2,862,640,46,62,20,57],
        [5,3,169,403,65,63,19,57],
        [5,4,169,525,71,59,15,55],
        [5,5,819,320,53,64,16,54],
        [5,6,613,590,44,68,16,53],
        [5,7,242,173,66,58,39,53],
        [6,0,166,168,76,59,52,54],
        [6,1,649,127,61,59,38,56],
        [6,2,630,658,46,68,20,62],
        [6,3,382,166,68,63,22,56],
        [6,4,375,58,81,57,19,54],
        [6,5,382,229,68,58,20,53],
        [6,6,872,320,43,64,16,52],
        [6,7,305,400,65,61,35,52],
        [7,0,370,403,66,59,47,55],
        [7,1,945,643,47,58,27,56],
        [7,2,795,699,46,62,20,57],
        [7,3,236,462,63,63,18,57],
        [7,4,819,59,70,59,17,55],
        [7,5,802,512,51,65,17,54],
        [7,6,632,726,44,68,16,53],
        [7,7,301,590,64,61,39,53]
      ]
    },
    attack: {
      duration: 200,
      frames: [
        [0,0,650,371,53,56,27,50],
        [0,1,492,787,36,62,22,54],
        [0,2,762,847,47,60,27,55],
        [0,3,508,180,53,55,25,54],
        [0,4,504,849,54,58,18,51],
        [0,5,885,702,35,59,7,48],
        [0,6,650,427,49,56,15,46],
        [0,7,819,269,55,51,23,47],
        [1,0,548,238,60,57,36,48],
        [1,1,450,225,58,62,44,53],
        [1,2,545,295,58,62,37,55],
        [1,3,524,125,63,55,25,53],
        [1,4,587,127,62,57,18,49],
        [1,5,389,849,60,58,8,46],
        [1,6,561,184,61,54,16,44],
        [1,7,881,181,62,54,29,43],
        [2,0,97,50,85,53,64,47],
        [2,1,915,304,47,68,35,59],
        [2,2,166,654,66,69,31,62],
        [2,3,742,0,88,56,24,53],
        [2,4,86,522,83,59,19,52],
        [2,5,549,452,52,68,9,49],
        [2,6,303,99,67,67,27,44],
        [2,7,200,0,94,47,60,41],
        [3,0,802,447,52,65,31,59],
        [3,1,653,57,62,70,32,61],
        [3,2,0,0,97,63,33,56],
        [3,3,94,103,85,56,21,53],
        [3,4,301,716,57,71,18,52],
        [3,5,87,796,62,68,22,48],
        [3,6,97,0,103,50,61,40],
        [3,7,294,0,95,44,64,40],
      ]
    },
    die: {
      duration: 175,
      frames: [
        [0,0,851,846,37,58,19,52],
        [0,1,889,59,68,61,23,53],
        [0,2,371,344,68,59,20,54],
        [0,3,557,520,44,70,18,53],
        [0,4,570,590,43,70,15,52],
        [0,5,235,231,73,60,42,51],
        [0,6,308,226,74,57,45,51],
        [0,7,729,794,41,53,21,51],
        [1,0,502,287,43,57,21,50],
        [1,1,811,790,45,56,17,48],
        [1,2,664,254,55,53,19,48],
        [1,3,841,702,44,62,18,48],
        [1,4,906,384,39,68,14,50],
        [1,5,807,384,52,63,28,51],
        [1,6,710,128,61,57,36,51],
        [1,7,632,794,46,54,24,51],
        [2,0,508,235,40,52,24,42],
        [2,1,678,794,51,53,17,43],
        [2,2,229,352,75,49,20,44],
        [2,3,819,118,68,55,20,44],
        [2,4,719,695,38,66,11,44],
        [2,5,528,789,55,60,31,43],
        [2,6,370,115,77,51,53,42],
        [2,7,456,112,68,48,44,42],
        [3,0,138,864,57,43,41,33],
        [3,1,964,701,38,50,19,42],
        [3,2,167,362,62,41,22,38],
        [3,3,0,864,79,43,21,38],
        [3,4,943,198,59,47,13,34],
        [3,5,772,640,41,52,16,31],
        [3,6,79,864,59,43,36,28],
        [3,7,86,581,78,36,55,28],
        [4,0,195,875,62,32,47,21],
        [4,1,601,551,42,39,23,29],
        [4,2,676,761,55,33,24,28],
        [4,3,308,283,72,35,22,28],
        [4,4,819,173,62,35,13,22],
        [4,5,257,867,44,40,18,18],
        [4,6,493,416,55,38,30,16],
        [4,7,302,318,72,25,49,16],
        [5,0,776,761,60,29,46,17],
        [5,1,914,812,46,32,32,21],
        [5,2,949,426,53,30,25,25],
        [5,3,945,400,57,26,22,20],
        [5,4,856,816,58,29,12,17],
        [5,5,731,761,45,33,13,16],
        [5,6,548,416,52,36,26,13],
        [5,7,945,372,57,28,34,12]
      ]
    }
  };
}
