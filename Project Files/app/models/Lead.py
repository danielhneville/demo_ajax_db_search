from system.core.model import Model
from flask import jsonify

class Lead(Model):
	def __init__(self):
		super(Lead, self).__init__()
	
	def get_leads(self, name, early, late, page, sort, order):
		query = 'SELECT * FROM leads'
		data = {}
		prev = False
		if name != '':
			query += ' WHERE CONCAT(first_name, " ", last_name) LIKE "%":name"%"'
			prev = True
			data['name'] = name
		if early != '':
			if prev:
				query += ' AND'
			else: query += ' WHERE'
			query += ' registered_datetime > :start'
			prev = True
			data['start'] = early
		if late != '':
			if prev:
				query += ' AND'
			else: query += ' WHERE'
			query += ' registered_datetime < :stop'
			data['stop'] = late
		if sort != '':
			self.check_sort(sort)
			query += ' ORDER BY ' + sort
		if order != '':
			if order == 'DESC':
				query += ' DESC'
			elif order == 'ASC':
				query += ' ASC'
		pages = self.db.query_db(query, data)
		query += ' LIMIT :offset, 10'
		data['offset'] = int(page)*10-10
		results = self.db.query_db(query, data)
		return jsonify({'people': results, 'pages': pages})

	def check_sort(self, sort):
		legal_vals = ['id','first_name','last_name','registered_datetime','email']
		if not sort in legal_vals:
			sort = 'registered_datetime'