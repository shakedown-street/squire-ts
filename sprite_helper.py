import sys

def generate(start_x, start_y, w, h, xOff, yOff, frames):
    frames_list = []
    for y in range(8):
        for x in range(frames):
            frame = [x, y, start_x + (w * x), start_y + (h * y) + (1 * y), w, h, xOff, yOff]
            frames_list.append(frame)
    frames_str = []
    for f in frames_list:
        frames_str.append('\t\t\t\t{},\n'.format(f))
    return frames_str


start_x = int(sys.argv[1])
start_y = int(sys.argv[2])
w = int(sys.argv[3])
h = int(sys.argv[4])
xOff = int(sys.argv[5])
yOff = int(sys.argv[6])
length = int(sys.argv[7])

frames_list = generate(start_x, start_y, w, h, xOff, yOff, length)

write_to = open('sprite_data', 'w')
write_to.writelines(frames_list)
write_to.close()
