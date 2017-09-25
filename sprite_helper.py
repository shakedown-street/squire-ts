def generate(start_x, start_y, w, h, frames):
    for y in range(8):
        for x in range(frames):
            print('{},'.format([x, y, start_x + (w * x), start_y + (h * y) + (1 * y), w, h, 0, 0]))
