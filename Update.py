from flask import render_template, request,session,redirect,url_for

class ClassUpdate:
    def __init__(self,mysql):
        self.mysql=mysql

    def class_info(self):
        try:
            user_name=session['username']
        except:
            return redirect(url_for('login'))
        conn = self.mysql.connect()
        cursor = conn.cursor()
        cursor.execute(
            "SELECT * from product")
        data = cursor.fetchall()
        return render_template('product.html', data=data)

    def class_delete(self):
        name = request.args["name"]
        print(name)
        conn = self.mysql.connect()
        cursor = conn.cursor()
        try:
            cursor.execute("""DELETE FROM product 
                              WHERE id = %s"""
                           , (name,))
            conn.commit()
            return "Success"
        except Exception as e:
            return "Error"

    def class_update(self):
        id = request.args['id']
        new_name = request.args['new_name']
        price = request.args['price']
        quantity = request.args['quantity']
        vendor = request.args['vendor']

        conn = self.mysql.connect()
        cursor = conn.cursor()
        print(id + " " + new_name + " " + price+" "+quantity+" "+vendor)

        try:
            cursor.execute("UPDATE product SET name=%s,unit_price=%s,quantity=%s,vendor=%s WHERE id=%s",
                           (new_name,price, quantity,vendor,id))
            conn.commit()
        except Exception as e:
            return "error"
        return "success"

    def class_insert(self):
        new_name = request.args['new_name']
        price = request.args['price']
        quantity = request.args['quantity']
        vendor = request.args['vendor']

        conn = self.mysql.connect()
        cursor = conn.cursor()

        try:
            # TODO: dept name should be replaced by sessions dept name
            cursor.execute("INSERT INTO product (name,unit_price,quantity,vendor) VALUES (%s,%s,%s,%s)",
                           (new_name,price,quantity,vendor,))
            conn.commit()
        except Exception as e:
            return "error"
        return "success"
