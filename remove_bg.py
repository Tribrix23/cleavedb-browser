from PIL import Image

def remove_white_background(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()

    newData = []
    for item in datas:
        # If the pixel is white (or very close to white), make it transparent
        if item[0] > 240 and item[1] > 240 and item[2] > 240:
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)

    img.putdata(newData)
    img.save(output_path, "PNG")

remove_white_background("C:/Users/Administrator/.gemini/antigravity/brain/97c24e03-8853-411b-b75d-4ccacafae031/.user_uploaded/media_1791591188436_b6d96352.png", "public/logo-full.png")
print("Done")
